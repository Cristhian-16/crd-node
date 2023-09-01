import jwt from 'jsonwebtoken'

const secret_key = process.env.SECRET_PUBLIC_KEY

export const generateJWT = (uuid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uuid }

    jwt.sign(
      payload,
      secret_key,
      {
        expiresIn: '2h'
      },
      (err, token) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(token)
        }
      }
    )
  })
}
