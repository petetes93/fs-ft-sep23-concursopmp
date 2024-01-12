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
    email: yup.string().required('email obligatorio'),
  })
  .required()

export { fields, schema }
