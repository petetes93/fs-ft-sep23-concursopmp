import * as yup from 'yup'

const fields = [
  {
    name: 'username',
    label: 'Username',
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
  },
  {
    name: 'email',
    label: 'Email',
  },
]

const schema = yup
  .object({
    username: yup.string().required('Nombre de usuario obligatorio'),
    password: yup.string().required('Contraseña obligatoria'),
    email: yup
      .string()
      .email('Correo electrónico no válido')
      .required('Correo electrónico obligatorio'),
  })
  .required()

export { fields, schema }
