
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../../config/config');
var { User } = require('../user/user.model');
// var Acc = require('../models/account.model');

const signin = async (req, res) => {

  try {
    let user = await User.findOne({
      "email": req.body.email
    })

    if (!user)
      return res.status('401').json({
        error: "User not found"
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      })
    }

    const payload = {
      _id: user._id
    }
    const token = jwt.sign(payload, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.status('200').json({
      token,
      payload,
    })
  } catch (err) {
    return res.status('401').json({
      error: "Could not sign in because " + err.message
    })
  }
}

const signout = (req, res) => {
  const cookie = req.headers.cookie || 'No Cookie Was Found'

  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out",
    cookie
  })
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

const authorizedToUpdateProfile = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}


module.exports = {
  signin,
  signout,
  requireSignin,
  authorizedToUpdateProfile,
}
