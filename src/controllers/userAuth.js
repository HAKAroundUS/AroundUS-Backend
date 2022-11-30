const validator = require("validator")
const { findUser, matchPassword, checkForRepeat, saveNewUser } = require("../models/models/user")
const AppError = require("../services/appError")
const catchAsync = require("../services/catchAsync")

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password)
    return next(new AppError('Invalid credentials', 401))
  const user = await findUser(email)
  if (!user) return res.json({ error: "Invalid credentials" })
  const isMatch = await matchPassword(email, password)
  if (!isMatch)
    return next(new AppError("Invalid credentials", 401))
  return res.json({
    status: "success",
    data: {
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token: isMatch,
    }
  })
})

const registerUser = catchAsync(async (req, res, next) => {
  const { name, password, email, phone } = req.body
  if (!name || !password || !email || !phone) 
    return next(new AppError('Missing fields', 400))

  const newUser = {
    name,
    password,
    email,
    phone
  }
  const savedUser = await saveNewUser(newUser)
  return res.json({
    status: "success",
    data: {
      user: savedUser[0],
      token: savedUser[1]
    }
  })
})

module.exports = { loginUser, registerUser }