import { Router } from 'express'

export const categoriasRoutes = Router()

categoriasRoutes.get('/', (req, res) => {
  res.json({
    msg: 'get API - categorias'
  })
})
