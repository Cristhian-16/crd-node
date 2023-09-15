import { Schema, model } from 'mongoose'

const ProductosSchema = new Schema({
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
  },
  precio: {
    type: Number,
    default: 0
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'CategoriaModel',
    required: [true, 'La categoria es requerida']
  },
  descripcion: {
    type: String
  },
  disponible: {
    type: Boolean,
    default: true
  }
})

ProductosSchema.methods.toJSON = function () {
  const { __v, password, ...producto } = this.toObject()
  return producto
}

export const ProductosModel = model('ProductosModel', ProductosSchema)
