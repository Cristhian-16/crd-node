export class UserControllers {
  static async getUsers(req, res) {
    res.json({ message: 'get' })
  }

  static async postUsers(req, res) {
    res.json({ message: 'post' })
  }

  static async putUsers(req, res) {
    res.json({ message: 'put' })
  }

  static async deleteUsers(req, res) {
    res.json({ message: 'delete' })
  }
}
