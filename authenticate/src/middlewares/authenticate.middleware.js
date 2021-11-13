const { verifyToken } = require('../utils/authenticate.utils')
const { unauthorizedResponse } = require('../utils/response.utils')

module.exports = async (request, response, next) => {
  if (!request.headers.authorization) {
    return unauthorizedResponse(
      response,
      'Unauthorized: Access is denied due to invalid credentials'
    )
  }
  const { authorization } = request.headers
  if (authorization.match(/^Bearer/) && !!authorization.split(' ')[1]) {
    const token = authorization.split(' ')[1]
    try {
      const decoded = await verifyToken(token, 's3cr3t-k3y')
      if (!decoded.user) {
        return unauthorizedResponse(response, 'token malformed')
      }
      next()
    } catch (err) {}
  }
  return unauthorizedResponse(response, 'token malformed')
}
