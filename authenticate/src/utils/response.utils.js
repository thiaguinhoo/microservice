const { StatusCodes } = require('http-status-codes')

const jsonError = (message) => {
  return { error: message }
}

const responseJson = (response, message, status = StatusCodes.OK) => {
  return response
    .status(status)
    .json(jsonError(message))
}

const unauthorizedResponse = (response, message) => {
  return responseJson(response, message, StatusCodes.UNAUTHORIZED)
}

module.exports = { unauthorizedResponse }
