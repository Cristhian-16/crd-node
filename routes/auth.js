import { Router } from 'express'
import { AuthController } from '../controllers/authControllers.js'

export const authRouter = Router()

authRouter.post('/login', AuthController.postAuth)
