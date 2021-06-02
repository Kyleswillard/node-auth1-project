const express = require('express')
// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const restricted = require('../auth/auth-middleware')
const Users = require('./users-model')

const userRouter = express.Router()

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

userRouter.get('/api/users', restricted, async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})
userRouter.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
        customMessage: 'Something went wrong inside the users router'
    })
})
// Don't forget to add the router to the `exports` object so it can be required in other modules

module.exports = userRouter
