import { Router } from 'express'

import { UserControllers } from '../controllers/userControllers.js'

export const userRoutes = Router()

userRoutes.get('/', UserControllers.getUsers)

userRoutes.post('/', UserControllers.postUsers)

userRoutes.put('/:id', UserControllers.putUsers)

userRoutes.delete('/:id', UserControllers.deleteUsers)
