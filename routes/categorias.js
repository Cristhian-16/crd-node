import { Router } from 'express'

import { CategoriaControllers } from '../controllers/categoriasControllers.js'
import { validarJWT } from '../middlewares/validarJWT.js'

export const categoriasRoutes = Router()

categoriasRoutes.get('/', CategoriaControllers.getCategorias)

categoriasRoutes.get('/:id', CategoriaControllers.getCategoria)

categoriasRoutes.post('/', [validarJWT], CategoriaControllers.postCategoria)

categoriasRoutes.put('/:id', CategoriaControllers.putCategoria)

categoriasRoutes.put('/:id', CategoriaControllers.deleteCategoria)
