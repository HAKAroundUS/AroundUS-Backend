const jwt = require('jsonwebtoken')

const generateToken = id => {
  const token = jwt.sign({userId: id}, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_LIFETIME
  })
  return token
}

module.exports = generateToken