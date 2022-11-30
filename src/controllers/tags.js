const { createTag, deleteFromShop, editShopTag } = require("../models/models/tags");
const { findById } = require("../models/models/shops");
const catchAsync = require("../services/catchAsync");
const AppError = require("../services/appError");

const addTag = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const { shopId, name, quantity } = req.body
    if (!shopId || !name || !quantity)
        return next(new AppError('Missing fields', 400))
    const shop = await findById(shopId)
    if (!shop)
        return next(new AppError('Invalid data', 401))
    const newShop = await createTag({ shopId, name, quantity })
    return res.json({
        status: 'success',
        data:
            newShop
    })
})

const deleteTag = catchAsync(async (req, res, next) => {
    const { shopId, name } = req.body
    console.log(req.body)
    if (!shopId || !name)
        return next(new AppError('Missing fields', 400))
    const newShop = await deleteFromShop({ shopId, name })
    return res.json({
        status: 'success',
        data: {
            shop: newShop
        }
    })
})

const editTag = catchAsync(async (req, res, next) => {
    const { shopId, name, quantity } = req.body
    if (!shopId || !name || !quantity)
        return next(new AppError('Missing fields', 400))
    const newShop = await editShopTag({ shopId, name, quantity })
    return res.json({
        status: 'success',
        data: {
            shop: newShop
        }
    })
})

module.exports = { addTag, deleteTag, editTag }