const express = require('express')
const path = require('path')
const SightingsService = require('./sightings-service.js')

const sightingsRouter = express.Router()
const jsonBodyParser = express.json()

const sightings = [];

const serializeSighting = sighting => ({
    id: sighting.id,
    name:xss(sighting.title)
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
    .post(jsonBodyParser, (req, res, next) => {
        const { title } = req.body
        const newSighting = { title }
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
                .location(path.posix.join(req.originalUrl, `/${sighing.sighting_id}`))
                .json(serializeSighting(sighting))
        })
        .catch(next)
    })

module.exports = sightingsRouter;