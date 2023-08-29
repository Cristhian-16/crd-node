import { Schema, model } from 'mongoose'

export const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  correo: {
    type: String,
    unique: true,
    required: [true, 'El correo es requerido']
  },
  password: {
    type: String,
    required: [true, 'La password es requerida']
  },
  estado: {
    type: Boolean,
    default: true
  }
})
usuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject()
  return usuario
}

export const UsuarioModel = model('UsuarioModel', usuarioSchema)
