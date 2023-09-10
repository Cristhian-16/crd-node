import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import { UsuarioModel } from '../schemas/usuarios.js'

const secret_key = process.env.SECRET_PUBLIC_KEY

export const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({ message: 'No hay token en la peticion' })
  }

  try {
    const { uuid } = jwt.verify(token, secret_key)

    const usuarios = await UsuarioModel.findById(uuid)

    if (!usuarios) {
      return res.status(400).json({ message: 'Usuario no existente' })
    }

    if (!usuarios.estado) {
      return res.status(401).json({ message: 'Token no valido' })
    }

    req.user = usuarios

    next()
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
