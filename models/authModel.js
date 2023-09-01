import bcrypt from 'bcrypt'

import { UsuarioModel } from '../schemas/usuarios.js'
import { generateJWT } from '../helpers/generateJWT.js'

export class authModel {
  static async postAuth(objeto) {
    const user = await UsuarioModel.findOne({ correo: objeto.correo })

    if (!user) return false

    if (!user.estado) return false

    const validatePassword = bcrypt.compareSync(objeto.password, user.password)

    if (!validatePassword) return false

    //* Generacion del JWT
    const token = await generateJWT(user.id)

    return {
      usuarioExist: user,
      validatePassword,
      token
    }
  }
}
