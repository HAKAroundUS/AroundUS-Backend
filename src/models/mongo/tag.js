const mongoose = require('mongoose')

const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        enum: ['green', 'yellow', 'red'],
        default: 'green',
        required: true
    }
})

module.exports = mongoose.model('Tag', tagsSchema)