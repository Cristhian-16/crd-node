import express from 'express'
import 'dotenv/config'

import { userRoutes } from './routes/usuarios.js'
import { authRouter } from './routes/auth.js'
import { connectDB } from './database/usuarios.js'
import { corsUser } from './middlewares/cors.js'
import { categoriasRoutes } from './routes/categorias.js'
import { productosRoutes } from './routes/productos.js'

console.clear()
const port = process.env.PORT || 3000

const app = express()

//? Middlewares
app.use(express.json())
app.use(corsUser())
app.disable('x-powered-by')
app.use(express.static('public'))

//* Routes
app.use('/api/auth', authRouter)
app.use('/api/usuarios', userRoutes)
app.use('/api/categorias', categoriasRoutes)
app.use('/api/productos', productosRoutes)

//* Database
connectDB()

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
