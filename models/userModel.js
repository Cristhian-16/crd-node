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

  static async putUser(id, objeto) {
    const usuarioId = await UsuarioModel.findById(id)

    //* Si no existe ese id por ende no Usuario
    if (!usuarioId) return false

    /* Volver a encryptar la contraseña */
    if (objeto.password) {
      const salt = bcrypt.genSaltSync(10)
      objeto.password = bcrypt.hashSync(objeto.password, salt)
    }

    //? Usuario Actualizado
    const usuarioUpdate = await UsuarioModel.findByIdAndUpdate(id, objeto, { new: true })

    return {
      usuarioId,
      usuarioUpdate
    }
  }
}
