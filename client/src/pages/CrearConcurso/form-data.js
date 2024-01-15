import * as yup from 'yup'

const fields = [
  {
    name: 'name',
    label: 'Nombre',
  },
  {
    name: 'image',
    label: '',
    type: 'file',
  },
  {
    name: 'rules',
    label: 'Reglas',
    multiline: true,
  },
  {
    name: 'start',
    label: 'Fecha de Inicio',
    type: 'date',
  },
  {
    name: 'finish',
    label: 'Fecha de Finalización',
    type: 'date',
  },
  {
    name: 'theme',
    label: 'Tema',
  },
]

const schema = yup
  .object({
    name: yup.string().required('Nombre de usuario obligatorio'),
    image: yup.string().required('Imagen no válida'),
    rules: yup.string().required('Contraseña obligatoria'),
    start: yup.date().required('Fecha no válida'),
    finish: yup.date().required('Fecha no válida'),
    theme: yup.string().required('Contraseña obligatoria'),
  })
  .required()

export { fields, schema }
