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
  },
  rol: {
    type: String,
    required: [true, 'El rol es requerido'],
    enum: ['USER_ROLE', 'ADMIN_ROLE']
  },
  google: {
    type: Boolean,
    default: false
  },
  picture: {
    type: String,
    default: ''
  }
})
usuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject()
  return usuario
}

export const UsuarioModel = model('UsuarioModel', usuarioSchema)
