const express = require('express')

const application = express()

application.get('/message', async (request, response) => {
  response
    .status(401)
    .json({
      error: 'Unauthorized: Access is denied due to invalid credentials'
    })
})

module.exports = application
