const express = require('express')
const path = require('path')
const xss = require('xss')
const SightingsService = require('./sightings-service.js')

const sightingsRouter = express.Router()
const jsonBodyParser = express.json()

const sightings = [];

const serializeSighting = sighting => ({
    sighting_id: sighting.sighting_id,
    title: xss(sighting.title),
    species: xss(sighting.species),
    brief_description: xss(sighting.brief_description),
    detailed_description: xss(sighting.detailed_description),
    sighting_date: sighting.sighting_date,
    sighting_location: xss(sighting.sighting_location)
})

sightingsRouter
    //get all sightings
    .get('/', jsonBodyParser, (req, res, next) => {
        const knex = req.app.get('db')
        SightingsService.getAllSightings(knex)
            .then(sightings => {
                res.json(sightings.map(serializeSighting))
            })
            .catch(next)
    })
    //create new sighting
    .post('/', jsonBodyParser, (req, res, next) => {
        const newSighting = req.body
        for (const [key, value] of Object.entries(newSighting))
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
    .all('/:sighting_id', (req, res, next) => {
        const knex = req.app.get('db')
        SightingsService.getById(
            knex,
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
    //retrieve sighting with specified id
    .get('/:sighting_id', (req, res, next) => {
        res.json(serializeSighting(res.sighting))
    })
    //edit existing sighting
    .patch('/:sighting_id', jsonBodyParser, (req, res, next) => {
        const { title, species, brief_description, detailed_description, sighting_date, sighting_location } = req.body
        const sightingToUpdate = { title, species, brief_description, detailed_description, sighting_date, sighting_location }

        const numberOfValues = Object.values(sightingToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain 'title', 'species', 'brief_description', 'detailed_description', 'sighting_date', or 'sighting_location'`
                }
            })
        SightingsService.updateSighting(
            req.app.get('db'),
            req.params.sighting_id,
            sightingToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    //delete sighting of specified id
    .delete('/:sighting_id', (req, res, next) => {
        SightingsService.deleteSighting(
            req.app.get('db'),
            req.params.sighting_id
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

sightingsRouter
    .get('/species/:species', (req, res, next) => {
        const knex = req.app.get('db')
        const species = req.params.species
        SightingsService.getBySpecies(
            knex,
            species
        )
        .then(sightings => {
            res.json(sightings.map(serializeSighting))
        })
        .catch(next)
    })

module.exports = sightingsRouter;