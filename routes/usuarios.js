import { Router } from 'express'

export const userRoutes = Router()

userRoutes.get('/', (req, res) => {
  res.json({ message: 'get' })
})

userRoutes.post('/', (req, res) => {
  res.json({ message: 'post' })
})

userRoutes.put('/:id', (req, res) => {
  res.json({ message: 'put' })
})

userRoutes.delete('/:id', (req, res) => {
  res.json({ message: 'delete' })
})
