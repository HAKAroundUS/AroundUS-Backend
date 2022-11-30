const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL.replace('<password>', process.env.MONGO_PASSWORD)
// const MONGO_URL = process.env.LOCALHOST

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', err => {
    console.log(err)
})

const mongoConnect = async () => {
    await mongoose.connect(MONGO_URL)
}

const mongoDisconnect = async () => {
    await mongoose.disconnect()
}

module.exports = { mongoConnect, mongoDisconnect }

