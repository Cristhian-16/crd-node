import z from 'zod'

const productoZod = z.object({
  nombre: z
    .string({
      message: 'El nombre es requerido',
      required_error: 'El nombre es requerido'
    })
    .min(3)
    .max(50),
  estado: z.boolean().default(true),
  usuario: z.string({
    message: 'El usuario es requerido',
    required_error: 'El usuario es requerido'
  }),
  precio: z.number().default(0),
  categoria: z.string({
    message: 'La categoria es requerida',
    required_error: 'La categoria es requerida'
  }),
  descripcion: z.string().optional(),
  disponible: z.boolean().default(true)
})

export const validateProductos = (object) => {
  return productoZod.partial().safeParse(object)
}
