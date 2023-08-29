import { request, response } from 'express'
import mongoose from 'mongoose'

import { validarCampos, validarCamposPartial } from '../schemas/usuariosZod.js'
import { UserModel } from '../models/userModel.js'

export class UserControllers {
  static async getUsers(req, res) {
    res.json({ message: 'get' })
  }

  static async postUsers(req = request, res = response) {
    try {
      const result = await validarCampos(req.body)

      if (result.error) {
        return res.status(400).json({ message: JSON.parse(result.error.message) })
      }

      const { usuario, emailExist } = await UserModel.postUser(result.data)

      if (emailExist !== null) return res.status(400).json({ message: 'Email Existente' })

      res.status(201).json(usuario)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async putUsers(req = request, res = response) {
    const { id } = req.params
    const result = await validarCamposPartial(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID no válido' })
    }

    const { usuarioId, usuarioUpdate } = await UserModel.putUser(id, result.data)

    if (!usuarioId) {
      return res.status(400).json({ message: 'Id ya existe' })
    }

    res.json(usuarioUpdate)
  }

  static async deleteUsers(req, res) {
    res.json({ message: 'delete' })
  }
}
