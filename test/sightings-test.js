const app = require('../src/app.js');
const { expect } = require('chai');
const helpers = require('./test-helpers');
const knex = require('knex');
const express = require('express');
const bcrypt = require('bcrypt');
const { makeSightingsArray } = require('./test-helpers.js')

describe('Sightings Endpoints', function() {
    let db
    
    const testSightings = makeSightingsArray()
    const testSightingsWithId = testSightings.map((sighting, index) => {
        sighting.sighting_id = index + 1
        return sighting;
    })

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () =>db('sightings').truncate())

    afterEach('cleanup', () => db('sightings').truncate())

    describe(`GET /api/sightings`, () => {
        context(`Given no sightings`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/sightings')
                    .expect(200, [])
            })
        })

        context(`Given there are sightings in the database`, () => {
            const testSightings = makeSightingsArray()

            beforeEach('insert sightings', () => {
                return db
                    .into('sightings')
                    .insert(testSightings)
            })

            it('responds with 200 and all of the sightings', () => {
                return supertest(app)
                    .get('/api/sightings')
                    .expect(200, testSightingsWithId)
            })
        })
    })

    describe(`GET /api/sightings/:sighting_id`, () => {
        context(`Given no sightings`, () => {
            it(`responds with 404`, () => {
                const sightingId = 123456
                return supertest(app)
                    .get(`/api/sightings/${sightingId}`)
                    .expect(404, { error: { 'message': 'Sighting doesn\'t exist' } })
            })
        })

        context('Given there are sightings in the database', () => {

            beforeEach('insert sightings', () => {
                return db
                    .into('sightings')
                    .insert(testSightings)
            })

            it('responds with 200 and the specified article', () => {
                const sightingId = 2
                const expectedSighting = testSightings[sightingId - 1]
                return supertest(app)
                    .get(`/api/sightings/${sightingId}`)
                    .expect(200, expectedSighting)
            })
        })
    })

    describe(`POST /api/sightings`, () => {
        it(`creates a sighting, responding with 201 and the new sighting`, () => {
            const newSighting = {
                title: 'test title',
                species: 'test species',
                brief_description: 'test brief description',
                detailed_description: 'test detailed description',
                sighting_date: new Date('2029-01-22'),
                sighting_location: 'test location'
            }
            return supertest(app)
                .post('/api/sightings')
                .send(newSighting)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newSighting.title)
                    expect(res.body.species).to.eql(newSighting.species)
                    expect(res.body.brief_description).to.eql(newSighting.brief_description)
                    expect(res.body.detailed_description).to.eql(newSighting.detailed_description)
                    expect(res.body.sighting_date).to.eql(newSighting.sighting_date)
                    expect(res.body.sighting_location).to.eql(newSighting.sighting_location)
                    expect(res.body).to.have.property('sighting_id')
                    const expected = new Date().toLocaleDateString()
                    console.log(expected);
                    const actual = new Date('res.body.sighting_date').toLocaleDateString()
                    console.log(actual);
                    expect(actual).to.eql(expected)
                })
                .then(postRes => 
                    supertest(app)
                        .get(`/api/sightings/${postRes.body.sighting_id}`)
                        .expect(postRes.body)
                )
        })

        const requiredFields = ['title', 'species', 'brief_description', 'detailed_description', 'sighting_date', 'sighting_location']

        requiredFields.forEach(field => {
            const newSighting = {
                title: 'test title',
                species: 'test species',
                brief_description: 'test brief description',
                detailed_description: 'test detailed description',
                sighting_date: '2020-01-23',
                sighting_location: 'test location'
            }
            it(`responds with 400 and an error message when the '${field}', is missing`, () => {
                delete newSighting[field]

                return supertest(app)
                    .post('/api/sightings')
                    .send(newSighting)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    })
})
module.exports = app;