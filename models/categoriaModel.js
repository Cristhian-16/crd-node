import { CategoriaModel } from '../schemas/categorias.js'

export class CategoriaModels {
  static async getCategorias(limit) {
    const usuarios = await CategoriaModel.find({ estado: true })
      .limit(Number(limit))
      .populate('usuario', 'nombre')

    return usuarios
  }

  static async postCategoria(objeto, usuario) {
    const { nombre } = objeto

    const nombreToUpper = nombre.toUpperCase()

    const categoriaDB = await CategoriaModel.findOne({ nombreToUpper })

    if (categoriaDB) return false

    const data = {
      nombre: nombreToUpper,
      usuario
    }

    const newCategoria = new CategoriaModel(data)

    await newCategoria.save()

    return {
      categoriaDB,
      newCategoria
    }
  }

  static async putCategoria(id, objeto) {
    const categoriaFind = await CategoriaModel.findById(id)

    if (!categoriaFind) return false

    if (objeto.nombre) {
      const nombreToUpper = objeto.nombre.toUpperCase()
      objeto.nombre = nombreToUpper
    }

    const categoriaUpdate = await CategoriaModel.findByIdAndUpdate(id, objeto, {
      new: true
    }).populate('usuario', 'nombre')

    return { categoriaUpdate }
  }
}
