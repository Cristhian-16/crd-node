import { Router } from 'express'

import { UserControllers } from '../controllers/userControllers.js'
import { validarJWT } from '../middlewares/validarJWT.js'
import { adminRole } from '../middlewares/validarRol.js'

export const userRoutes = Router()

userRoutes.get('/', UserControllers.getUsers)

userRoutes.post('/', UserControllers.postUsers)

userRoutes.put('/:id', UserControllers.putUsers)

userRoutes.delete('/:id', [validarJWT, adminRole], UserControllers.deleteUsers)
