module.exports = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response
      .json({ error: 'Unauthorized: Authentication credentials were not provided' })
  }
  const { authorization } = request.headers
  if (!authorization.match(/^Bearer/)) {
    return response.json({ error: 'token malformed' })
  }
  next()
}
