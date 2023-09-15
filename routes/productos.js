import { Router } from 'express'

import { validarJWT } from '../middlewares/validarJWT.js'
import { ProductosControllers } from '../controllers/productosControllers.js'

export const productosRoutes = Router()

productosRoutes.get('/', ProductosControllers.getProductos)

productosRoutes.post('/', [validarJWT], ProductosControllers.postProductos)

productosRoutes.put('/:id', ProductosControllers.putProductos)

productosRoutes.delete('/:id', ProductosControllers.deleteProductos)
