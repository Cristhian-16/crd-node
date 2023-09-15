import { ProductosModel } from '../schemas/productos.js'

import { CategoriaModel } from '../schemas/categorias.js'

export class ProductosModels {
  static async postProductos(objeto, usuario) {
    const id = objeto.categoria

    const categoriaDB = await CategoriaModel.findById(id)

    // if (categoriaDB) return false

    const producto = {
      ...objeto,
      usuario
    }

    const newProducto = new ProductosModel(producto)

    await newProducto.save()

    return newProducto
  }

  // static asyn getProductos()
}
