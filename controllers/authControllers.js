import { request, response } from 'express'

import { validarCamposGoogle, validarCamposLogin } from '../zod/loginZod.js'
import { authModel } from '../models/authModel.js'
import { verifyGoogle } from '../helpers/google-verify.js'
import { UsuarioModel } from '../schemas/usuarios.js'
import { generateJWT } from '../helpers/generateJWT.js'

export class AuthController {
  static async postAuth(req = request, res = response) {
    try {
      const result = validarCamposLogin(req.body)

      if (result.error) {
        return res.status(404).json({ message: JSON.parse(result.error.message) })
      }

      const { usuarioExist, validatePassword, token } = await authModel.postAuth(
        result.data
      )

      if (!usuarioExist) {
        return res
          .status(400)
          .json({ message: 'Correo | Password no son correctos : Correo' })
      }
      if (!usuarioExist.estado) {
        return res.status(400).json({ message: 'El usuario no existe' })
      }

      if (!validatePassword) {
        return res
          .status(400)
          .json({ message: 'Correo | Password no son correctos : Password' })
      }

      res.json({ user: usuarioExist, token })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async googleSingIn(req = request, res = response) {
    const result = validarCamposGoogle(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    try {
      const { correo, nombre, picture } = await verifyGoogle(result.data.id_token)

      let user = await UsuarioModel.findOne({ correo })

      if (!user) {
        const data = {
          nombre,
          correo,
          password: ':D',
          picture,
          rol: 'USER_ROLE'
        }

        user = new UsuarioModel(data)

        await user.save()
      }

      if (!user.estado) {
        return res.status(400).json({ message: 'Usuario Denegado' })
      }

      const token = await generateJWT(user.id)

      res.json({
        user,
        token
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
