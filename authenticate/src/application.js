const express = require('express')
const authenticateMiddleware = require('./middlewares/authenticate.middleware')

const application = express()

application.get('/message', authenticateMiddleware, async (request, response) => {
  response
    .status(401)
    .json({
      message: 'Welcome to development world'
    })
})

module.exports = application
