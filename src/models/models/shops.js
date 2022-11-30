const Shop = require('./../mongo/shop')
const deleteFields = require('./../../services/deleteFields')
const catchAsync = require('../../services/catchAsync')
const AppError = require("./../../services/appError")

// const findByQuery = async (city, tag) => {
//     const queryObject = {
//       city: city
//     }
//     if (tag){
//       queryObject.tags = tag
//       queryObject.tags = { $regex: tag, $options: "i" }
//     }
//     if (city)
//       queryObject.city = { $regex: city, $options: "i" }
//     const shops = await Shop.find(queryObject)
//     return shops
// }

const findByQuery = async city => {
  const queryObject = {
    city
  }
  queryObject.city = { $regex: city, $options: "i" }
  const shops = await Shop.find(queryObject)
  return shops
}

const findById = async _id => {
  const shop = await Shop.findById(_id)
  return shop
}

const addShop = async shop => {
  const newShop = new Shop(shop)
  const savedShop = await newShop.save()
  return deleteFields(['__v', '_id'], savedShop)
}

const findByOwnerId = async userId => {
  const shops = await Shop.find({ ownerId: userId })
  return shops
}

module.exports = { findByQuery, findById, addShop, findByOwnerId }