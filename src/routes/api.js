const express = require('express')
const shopsRouter = require('./shops')
const tagsRouter = require('./tags')
const getShopsRouter = require('./allShops')
const userRouter = require('./user')

const api = express.Router()

api.use('/user', userRouter)
api.use('/tags', tagsRouter)
api.use('/getshops', getShopsRouter)
api.use('/shops', shopsRouter)

module.exports = api