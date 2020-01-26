const express = require('express')
const path = require('path')
const xss = require('xss')
const SightingsService = require('./sightings-service.js')

const sightingsRouter = express.Router()
const jsonBodyParser = express.json()

const sightings = [];

const serializeSighting = sighting => ({
    id: sighting.sighting_id,
    title:xss(sighting.title),
    species: sighting.species,
    brief_description: sighting.brief_description,
    detailed_description: sighting.detailed_description,
    sighting_date: sighting.sighting_date,
    sighting_location: sighting.sighting_location
})

sightingsRouter
    .get('/sighting', jsonBodyParser, (req, res, next) => {
        const knex = req.app.get('db')
        SightingsService.getAllSightings(knex)
            .then(sightings => {
                res.json(sightings.map(serializeSighting))
            })
            .catch(next)
    })
    .post('/sighting', jsonBodyParser, (req, res, next) => {
        const { title, species, brief_description, detailed_description, sighting_date, sighting_location } = req.body
        console.log(req.body);
        const newSighting = { title, species, brief_description, detailed_description, sighting_date, sighting_location }
        sightings.push(newSighting)

        for ( const [key, value] of Object.entries(newSighting))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
        SightingsService.insertSighting(
            req.app.get('db'),
            newSighting
        )
        .then(sighting => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${sighting.sighting_id}`))
                .json(serializeSighting(sighting))
        })
        .catch(next)
    })

sightingsRouter
    .all('/sighting/:sighting_id', (req, res, next) => {
        SightingsService.getById(
            req.app.get('db'),
            req.params.sighting_id
        )
        .then(sighting => {
            if(!sighting) {
                return res.status(404).json({
                    error: { message: `Sighting doesn't exist` }
                })
            }
            res.sighting = sighting
            next()
        })
        .catch(next)
    })
    .get('/sighting/:sighting_id', (req, res, next) => {
        res.json(sighting.map(serializeSighting(res.sightings)))
    })
    .put('/sighting/:sighting_id', (req, res, next) => {
        //insert PUT code here
    })
    .delete('/sighting/:sighting_id', (req, res, next) => {
        SightingsService.deleteSighting(
            req.app.get('db'),
            req.params.sighting_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = sightingsRouter;