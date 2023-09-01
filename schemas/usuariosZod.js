import z from 'zod'

const usuarioZod = z.object({
  nombre: z
    .string({
      required_error: 'Nombre es requerido',
      invalid_type_error: 'El nombre debe ser un string'
    })
    .min(3, { message: 'El nombre debe tener minimo 3 letras' }),
  correo: z
    .string({
      required_error: 'Correo es Requerido',
      invalid_type_error: 'Email debe ser un string'
    })
    .email({ message: 'Email invalido' }),
  password: z
    .string({
      required_error: 'password es requerida'
    })
    .min(6, { message: 'La password debe tener minimo 6 letras' }),
  estado: z.boolean().default(true).optional(),
  rol: z.enum(['USER_ROLE', 'ADMIN_ROLE'])
})

export const validarCampos = async (object) => {
  return usuarioZod.safeParse(object)
}

export const validarCamposPartial = async (object) => {
  return usuarioZod.partial().safeParse(object)
}
