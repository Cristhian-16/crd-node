import { request, response } from 'express'
import { validarCamposLogin } from '../schemas/loginZod.js'
import { authModel } from '../models/authModel.js'

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
}
