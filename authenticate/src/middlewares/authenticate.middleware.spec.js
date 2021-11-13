const sinon = require('sinon')

const authenticateMiddleware = require('./authenticate.middleware')

describe('authenticate middleware', () => {
  it('should return a true', () => {
    expect(typeof authenticateMiddleware)
      .toEqual('function')
  })
  it('accept three arguments', () => {
    expect(authenticateMiddleware.length)
      .toEqual(3);
  })
  it ('return error if authorization header not defined', async () => {
    const requestMock = {
      headers: {}
    }
    const responseMock = { json: sinon.spy() }
    await authenticateMiddleware(requestMock, responseMock)
    expect(responseMock.json.called).toBeTruthy()
    expect(responseMock.json.getCall(0).args[0])
      .toMatchObject({
        error: 'Unauthorized: Authentication credentials were not provided'
      })
  })
  it('should return token malformed', async () => {
    const responseMock = { json: sinon.spy() }
    const requestMock = {
      headers: {
        authorization: 'xyz-123'
      }
    }
    await authenticateMiddleware(requestMock, responseMock)
    expect(responseMock.json.getCall(0).args[0])
      .toMatchObject({
        error: 'token malformed'
      })
  })
  it('success', async () => {
    const responseMock = { json: sinon.spy() }
    const requestMock = {
      headers: {
        authorization: 'Bearer xyz-123'
      }
    }
    const nextFake = sinon.fake()
    await authenticateMiddleware(
      requestMock, responseMock, nextFake
    )
    expect(nextFake.called).toBeTruthy()
  })
})
