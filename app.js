import express from 'express'
import 'dotenv/config'

import { userRoutes } from './routes/usuarios.js'
import { authRouter } from './routes/auth.js'
import { connectDB } from './database/usuarios.js'
import { corsUser } from './middlewares/cors.js'

console.clear()
const port = process.env.PORT || 3000

const app = express()

//? Middlewares
app.use(express.json())
app.use(corsUser())
app.disable('x-powered-by')

//* Routes
app.use('/api/auth', authRouter)
app.use('/api/usuarios', userRoutes)

//* Database
connectDB()

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
