const express = require('express')

const application = express()

application.get('/message', async (request, response) => {
  response.sendStatus(401)
})

module.exports = application
