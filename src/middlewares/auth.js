const jwt = require('jsonwebtoken')
const AppError = require('../services/appError')
const catchAsync = require('../services/catchAsync')

const tagsAuth = (req, res, next) => {
    const authHeaders = req.headers.authorization
    if (!authHeaders || !authHeaders.startsWith("Bearer"))
      return next(new AppError('Authentication failed', 401))
    const token = authHeaders.split(" ")[1]
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      req.user = { userId: payload.userId }
    } catch (err) {
      return next(new AppError('Authentication failed', 401))
    }
    return next()
}

module.exports = tagsAuth