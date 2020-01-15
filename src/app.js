require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const usersRouter = require('./users-router');
const authRouter = require('./auth-router');
const knex = require('knex');

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})
console.log('knex and driver installed correctly');

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!')
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