import { OAuth2Client } from 'google-auth-library'

const CLIENT_ID = process.env.GOOGLE_ID
const client = new OAuth2Client()

export async function verifyGoogle(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  })
  const { email, email_verified, name, picture } = ticket.getPayload()

  return {
    correo: email,
    email_verified,
    nombre: name,
    picture
  }
}

/* 
    iss: 'https://accounts.google.com',
    azp: '596631456460-5ulk9uqk81nse7p359bdsm38sk4uf4oj.apps.googleusercontent.com',
    aud: '596631456460-5ulk9uqk81nse7p359bdsm38sk4uf4oj.apps.googleusercontent.com',
    sub: '110062855919650801579',
    email: 'cristhianespiritunahui@gmail.com',
    email_verified: true,
    nbf: 1694019126,
    name: 'Cristhian Espiritu',
    picture: 'https://lh3.googleusercontent.com/a/AAcHTtfIfOZImuqDwX1gRXHDlKjwbCIg0rJGi03DWEhde-F5=s96-c',
    given_name: 'Cristhian',
    family_name: 'Espiritu',
    locale: 'es',
    iat: 1694019426,
    exp: 1694023026,
    jti: '5769199ad25720245349e99a73f8c0fa6917faea'
  */
