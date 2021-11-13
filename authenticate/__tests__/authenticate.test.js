const supertest = require('supertest')
const { StatusCodes } = require('http-status-codes')

const application = require('../src/application')
const authenticateMiddleware = require('../src/middlewares/authenticate.middleware')

const request = supertest(application)

jest.mock('../src/middlewares/authenticate.middleware.js', () => {
  return async (request, response, next) => next()
})

beforeEach(() => {
  jest.resetModules();
});

describe('authenticate endpoint', () => {
  it('should return status code 401', async () => {
    const response = await request.get('/message')
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  it('should return error unauthorized', async () => {
    const response = await request.get('/message')
    expect(response.body).toMatchObject({
      error: 'Unauthorized: Access is denied due to invalid credentials'
    })
  })

  it('should return message', async () => {
    const response = await request.get('/message', {
      headers: {
        authorization: 'Bearer xyz-123'
      }
    })
    expect(response.body).toMatchObject({
      message: 'Welcome to development world'
    })
  })
})
