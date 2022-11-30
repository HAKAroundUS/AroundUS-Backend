const express = require('express')
const {getShopsByQuery, getShopById, addNewShop} = require('../controllers/shops')
const auth = require('../middlewares/auth')

const shopsRouter = express.Router()

shopsRouter.get('/', getShopsByQuery)
shopsRouter.get('/:id', auth, getShopById)
shopsRouter.post('/', auth, addNewShop)

module.exports = shopsRouter