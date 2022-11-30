const mongoose = require('mongoose')
const Tag = require('./tag')

const shopsSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.ObjectId,
    ref: "Owner",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: [true, "Missing field shopname"],
  },
  category: {
    type: String,
    required: [true, "Missing field category"],
  },
  city: {
    type: String,
    require: [true, "Missing field city"],
  },
  address: {
    type: String,
    required: [true, "Missing field addresss"],
  },
  latitude: Number,
  longitude: Number,
  image: {
    data: Buffer,
    contentType: String,
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  search: [String],
  tags: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          enum: ['green', 'yellow', 'red'],
          default: 'green',
        },
      },
    ],
});

module.exports = mongoose.model('Shop', shopsSchema)