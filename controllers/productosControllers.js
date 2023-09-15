import { response, request } from 'express'

import { validateProductos } from '../zod/productoZod.js'
import { ProductosModels } from '../models/productosModel.js'
import { ProductosModel } from '../schemas/productos.js'

export class ProductosControllers {
  static async getProductos(req = request, res = response) {
    const productos = await ProductosModel.find({ estado: true })

    res.json(productos)
  }

  static async postProductos(req = request, res = response) {
    const result = validateProductos(req.body)
    const usuario = req.user._id

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const newProducto = await ProductosModels.postProductos(result.data, usuario)

    res.status(201).json({ producto: newProducto })
  }

  static async putProductos(req = request, res = response) {
    res.send('PUT /api/productos')
  }

  static async deleteProductos(req = request, res = response) {
    res.send('DELETE /api/productos')
  }
}
