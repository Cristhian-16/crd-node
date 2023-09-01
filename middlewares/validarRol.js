import { request, response } from 'express'

export const adminRole = async (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({ message: 'Accion no permitida' })
  }

  const { rol } = req.user

  if (rol !== 'ADMIN_USER') {
    return res.status(401).json({ message: 'Accion no disponible' })
  }

  next()
}
