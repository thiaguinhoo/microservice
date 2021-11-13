const supertest = require('supertest')

const application = require('../src/application')

const request = supertest(application)

describe('authenticate endpoint', () => {
  it('should return status code 401', async () => {
    const response = await request.get('/message')
    expect(response.status).toBe(401)
  })
  it('should return error unauthorized', async () => {
    const response = await request.get('/message')
    expect(response.body).toMatchObject({
      error: 'Unauthorized: Access is denied due to invalid credentials'
    })
  })
})
