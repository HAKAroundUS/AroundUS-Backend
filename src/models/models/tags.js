const Tag = require('./../mongo/tag')
const Shop = require('./../mongo/shop')
const catchAsync = require('../../services/catchAsync')

// const createTag = async tag => {
//     const newTag = new Tag(tag)
//     const savedTag = await newTag.save()
//     return savedTag
// }

const createTag = async ({shopId, name, quantity}) => {
    const newTag = {name, quantity}
    console.log(newTag)
    await Shop.findByIdAndUpdate(shopId, {$push: {tags: newTag, search: name}})
    const newShop = await Shop.findById(shopId)
    return newShop
}

const deleteFromShop = async ({shopId, name}) => {
    await Shop.findByIdAndUpdate(shopId, {$pull: {tags: {name}, search: name}})
    const newShop = await Shop.findById(shopId)
    return newShop
}

const editShopTag = async ({shopId, name, quantity}) => {
    await Shop.updateOne({_id: shopId, 'tags.name': name}, {$set: {'tags.$.quantity':quantity}})
    const newShop = await Shop.findById(shopId)
    return newShop
}

module.exports = {createTag, deleteFromShop, editShopTag}