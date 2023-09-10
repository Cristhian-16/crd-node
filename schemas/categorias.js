import { Schema, model } from 'mongoose'

const CategoriaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: [true, 'El estado es requerido']
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'UsuarioModel',
    required: [true, 'El usuario es requerido']
  }
})

export const CategoriaModel = model('CategoriaModel', CategoriaSchema)
