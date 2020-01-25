const express = require('express')
const path = require('path')

const jsonBodyParser = express.json()

sightingsRouter
    .get('/sightings', jsonBodyParser, (req, res, next) => {
        const { title, species, brief_description, detailed_description, sighting_date, sighting_location } = req.body
        console.log(req.body);
        for(const field of ['title', 'species', 'brief_description', 'detailed_description', 'sighting_date', 'sighting_location']) {
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })
        }
    })