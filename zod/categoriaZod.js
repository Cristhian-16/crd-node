import z from 'zod'

const categoriaZod = z.object({
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
  })
})

export const validateCategorias = (object) => {
  return categoriaZod.partial().safeParse(object)
}
