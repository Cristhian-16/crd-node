import bcrypt from 'bcrypt'

import { UsuarioModel } from '../schemas/usuarios.js'

export class UserModel {
  static async postUser(objeto) {
    const usuario = new UsuarioModel(objeto)

    const emailExist = await UsuarioModel.findOne({ correo: usuario.correo })

    //* Verifica Email
    if (emailExist) return false

    //? Encryptar contraseña
    const salt = bcrypt.genSaltSync(10)
    usuario.password = bcrypt.hashSync(objeto.password, salt)

    await usuario.save()

    return {
      usuario,
      emailExist
    }
  }
}
