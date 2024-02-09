const { findByQuery, findById, addShop, findByOwnerId } = require("../models/models/shops")
const { count } = require("../models/mongo/tag")
const AppError = require("../services/appError")
const catchAsync = require("../services/catchAsync")
const getCoords = require("../services/getCoords")

const getShopsByQuery = catchAsync(async (req, res, next) => {
    let { city } = req.query
    city = city.split(',').join(' ')
    const coords = await getCoords(city)
    const shops = await findByQuery(city)
    return res.json({
        status: 'success',
        results: shops.length,
        data: {
            shops,
            coords
        }
    })
})

const getShopById = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const shop = await findById(id)
    return res.json({
        status: 'success',
        data: {
            shop
        }
    })
})

const addNewShop = catchAsync(async (req, res, next) => {
    const { name, category, address, latitude, longitude } = req.body

    if (!name || !category || !address)
        return next(new AppError('Missing fields', 400))

    const city = address.split(',')[1]

    const ownerId = req.user.userId

    const newShop = { ownerId, name, category, address, latitude, longitude, city, search: [category], tags: [] }

    const savedShop = await addShop(newShop)
    return res.json({
        status: 'success',
        data: {
            savedShop
        }
    })
})

const getShopsByUser = catchAsync(async (req, res, next) => {
    const ownerId = req.user.userId
    const shops = await findByOwnerId(ownerId)
    return res.json({
        status: 'success',
        results: shops.length,
        data: {
            shops
        }
    })
})

module.exports = { getShopsByQuery, getShopById, addNewShop, getShopsByUser }