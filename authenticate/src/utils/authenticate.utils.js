const jwt = require('jsonwebtoken')

async function verifyToken (token, secretKey) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secretKey,
      { expiresIn: '1d' },
      (err, decoded) => {
        if (err) {
          return reject(err)
        }
        return resolve(decoded)
      }
    )
  })
}

module.exports = { verifyToken }
