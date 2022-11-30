const Owner = require('../mongo/owner')
const bcrypt = require('bcrypt')
const generateToken = require('../../services/jwt')
const catchAsync = require('../../services/catchAsync')

const findUser = async email => {
    const user = await Owner.findOne({email})
    return user
}

const matchPassword = async (email, password) => {
    const user = await Owner.findOne({email},{'__v':0})
    const result = await bcrypt.compare(password, user.password)
    if(result){
        console.log(user._id.toString())
        const token = generateToken(user._id.toString())
        return token
    }
    return false
}

const checkForRepeat = async (email) => {
  const repeat = await Owner.findOne({ email: email })
  return repeat
}

const saveNewUser = async (user) => {
  const newUser = new Owner(user)
  const savedUser = await newUser.save()
  const token = generateToken(savedUser._id)
  return [
    {
      name: savedUser.name,
      email: savedUser.email,
      phone: savedUser.phone,
    },
    token
  ]
}

module.exports = {findUser, matchPassword, checkForRepeat, saveNewUser}