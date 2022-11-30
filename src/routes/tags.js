const express = require('express')
const { addTag, deleteTag, editTag } = require('../controllers/tags')
const tagsAuth = require('../middlewares/auth')

const tagsRouter = express.Router()

tagsRouter.use(tagsAuth)

tagsRouter.post('/', addTag)
tagsRouter.post('/delete', deleteTag)
tagsRouter.patch('/', editTag)

module.exports = tagsRouter