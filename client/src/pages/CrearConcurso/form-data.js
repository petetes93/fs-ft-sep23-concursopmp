import * as yup from 'yup'

const fields = [
  {
    name: 'name',
    label: 'Nombre',
  },
  {
    name: 'image',
    placeholder: 'URL Image',
    type: 'file',
  },
  {
    name: 'description',
    label: 'Descipción',
    multiline: true,
  },
  {
    name: 'rules',
    label: 'Reglas',
    multiline: true,
  },
  {
    name: 'startDate',
    label: 'Fecha de Inicio',
    type: 'date',
  },
  {
    name: 'finishDate',
    label: 'Fecha de Finalización',
    type: 'date',
  },
  {
    name: 'theme',
    label: 'Tema',
  },
]

const TYPES = {
  'image/jpeg': 'jpeg',

  'image/png': 'png',
}
const schema = yup
  .object({
    name: yup.string().required('Nombre de usuario obligatorio'),
    image: yup.mixed().required('Imagen Obligatoria'),
    rules: yup.string().required('Reglas obligatorias'),
    description: yup.string().required('Descripción obligatoria'),
    startDate: yup.string().required('Fecha no válida'),
    finishDate: yup.string().required('Fecha no válida'),
    theme: yup.string().required('Contraseña obligatoria'),
  })
  .required()

export { fields, schema, TYPES }
