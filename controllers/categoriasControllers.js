import { request, response } from 'express'
import mongoose from 'mongoose'

import { validateCategorias } from '../zod/categoriaZod.js'
import { CategoriaModels } from '../models/categoriaModel.js'
import { CategoriaModel } from '../schemas/categorias.js'

export class CategoriaControllers {
  static async getCategorias(req = request, res = response) {
    const { limit = 5 } = req.params

    const usuarios = await CategoriaModels.getCategorias(limit)

    if (!usuarios) return res.status(400).json({ message: 'No hay categorias' })

    res.json(usuarios)
  }

  static async getCategoria(req = request, res = response) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID no válido' })
    }

    const usuario = await CategoriaModel.findById(id).populate('usuario', 'nombre')

    if (!usuario) return res.status(400).json({ message: 'No existe la categoria' })

    res.json(usuario)
  }

  static async postCategoria(req = request, res = response) {
    const result = validateCategorias(req.body)
    const usuario = req.user._id

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const { categoriaDB, newCategoria } = await CategoriaModels.postCategoria(
      result.data,
      usuario
    )

    if (categoriaDB) {
      return res.status(400).json({ message: 'La categoria ya existe' })
    }

    res.status(201).json({ newCategoria })
  }

  static async putCategoria(req = request, res = response) {
    const { id } = req.params
    const result = validateCategorias(req.body)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID no válido' })
    }

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const { categoriaUpdate } = CategoriaModels.putCategoria(id, result.data)

    if (!categoriaUpdate) {
      return res.status(400).json({ message: 'Id ya existe' })
    }

    res.json({ message: 'Categoria Actualizada' })
  }

  static async deleteCategoria(req = request, res = response) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID no válido' })
    }

    const deleteCategoria = await CategoriaModel.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    )

    if (!deleteCategoria) {
      return res.status(400).json({ message: 'Id ya existe' })
    }

    res.json({ message: 'Categoria Eliminada' })
  }
}
