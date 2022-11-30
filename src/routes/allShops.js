const express = require("express")
const { getShopsByUser } = require("../controllers/shops")
const auth = require('../middlewares/auth')

const getShopsRouter = express.Router()

getShopsRouter.get("/", auth, getShopsByUser)

module.exports = getShopsRouter