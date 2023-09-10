export class CategoriaControllers {
  static async getCategorias(req, res) {
    res.json({
      msg: 'get API - categorias'
    })
  }

  static async getCategoria(req, res) {
    res.json({
      msg: 'get API - categoria'
    })
  }

  static async postCategoria(req, res) {
    res.json({
      msg: 'post API - categoria'
    })
  }

  static async putCategoria(req, res) {
    res.json({
      msg: 'put API - categoria'
    })
  }

  static async deleteCategoria(req, res) {
    res.json({
      msg: 'delete API - categoria'
    })
  }
}
