import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { userRoutes } from './routes/usuarios.js'

console.clear()
const port = process.env.PORT || 3000

const app = express()

//? Middlewares
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

//* Routes
app.use('/api/usuarios', userRoutes)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
