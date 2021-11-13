const sinon = require('sinon')
const httpMocks = require('node-mocks-http')

const authenticateMiddleware = require('./authenticate.middleware')
const { verifyToken } = require('../utils/authenticate.utils')

jest.mock('../utils/authenticate.utils.js')

describe('authenticate middleware', () => {
  it('should return a typeof function', () => {
    expect(typeof authenticateMiddleware)
      .toEqual('function')
  })

  it('accept three arguments', () => {
    expect(authenticateMiddleware.length)
      .toEqual(3)
  })

  it('return error if authorization header not defined', async () => {
    const request = httpMocks.createRequest({
      headers: {}
    })
    const response = httpMocks.createResponse()
    response.json = sinon.stub()
    await authenticateMiddleware(request, response)
    expect(response.json.called).toBeTruthy()
    expect(response.json.getCall(0).args[0])
      .toMatchObject({
        error: 'Unauthorized: Access is denied due to invalid credentials'
      })
  })

  it('should return token malformed', async () => {
    const request = {
      headers: {
        authorization: 'xyz-123'
      }
    }
    const response = httpMocks.createResponse()
    response.json = sinon.stub()
    await authenticateMiddleware(request, response)
    expect(response.json.getCall(0).args[0])
      .toMatchObject({
        error: 'token malformed'
      })
  })

  it('prop user is not defined in decoded', async () => {
    verifyToken.mockImplementation(
      async () => Promise.resolve({})
    )
    const request = httpMocks.createRequest({
      headers: {
        authorization: 'Bearer xyz-123'
      }
    })
    const response = httpMocks.createResponse()
    response.json = sinon.stub()
    await authenticateMiddleware(request, response)
    expect(response.json.getCall(0).args[0])
      .toMatchObject({ error: 'token malformed' })
  })

  it('success next function is called', async () => {
    verifyToken.mockImplementation(
      async () => Promise.resolve({ user: {} })
    )
    const request = httpMocks.createRequest({
      headers: {
        authorization: 'Bearer xyz-123'
      }
    })
    const response = httpMocks.createResponse()
    response.json = sinon.stub()
    const next = sinon.fake()
    await authenticateMiddleware(
      request, response, next
    )
    expect(next.called).toBeTruthy()
  })
})
