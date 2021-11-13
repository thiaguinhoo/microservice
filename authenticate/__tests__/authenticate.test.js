const supertest = require('supertest')
const application = require('../src/application')

const request = supertest(application)

describe('authenticate endpoint', () => {
  it('should return status code 401', async () => {
    const response = await request.get('/message')
    expect(response.status).toBe(401)
  })
})
