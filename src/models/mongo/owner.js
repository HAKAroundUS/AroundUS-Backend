const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const ownersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: [5, 'Name is too short'],
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Password too short']
    },
    email: {
        type: String,
        validate: {
            validator: v => validator.isEmail(v),
            message: props => `${props} is not a valid email`
        },
        unique: true
    },
    phone: {
        type: Number,
        required: true
    }
})

ownersSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('Owner', ownersSchema)