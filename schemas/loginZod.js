import z from 'zod'

const loginZod = z.object({
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
    .min(6, { message: 'La password debe tener minimo 6 letras' })
})

const googleLogin = z.object({
  id_token: z.string({
    required_error: 'id_token Valido',
    invalid_type_error: 'id_token debe ser un string'
  })
})

export const validarCamposLogin = (object) => {
  return loginZod.safeParse(object)
}

export const validarCamposGoogle = (object) => {
  return googleLogin.safeParse(object)
}
