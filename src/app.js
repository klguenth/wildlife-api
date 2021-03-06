require('dotenv').config()
const { NODE_ENV, PORT, DATABASE_URL } = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const usersRouter = require('./users-router');
const UsersService = require('./users-service.js');
const authRouter = require('./auth-router');
const AuthService = require('./auth-service.js');
const sightingsRouter = require('./sightings-router.js');
const SightingsService = require('./sightings-service.js');
const knex = require('knex');

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const db = knex({
    client: 'pg',
    connection: DATABASE_URL,
})

app.set('db', db)

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/sightings', sightingsRouter)
app.get('/', (req, res, next) => {
    res.send('Hello World');
})
app.use('*', (req, res, next) => {
    res.status(404).send('It ain\'t here!');
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
 })

module.exports = app