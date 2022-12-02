const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const api = require('./routes/api')
const globalErrorHandler = require('./controllers/error')
const AppError = require('./services/appError')

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
  })
);

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

app.use(express.json())

app.use('/v1', api)

app.all('/*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app