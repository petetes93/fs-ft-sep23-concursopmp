import * as yup from 'yup'

const fields = [
  {
    name: 'title',
    label: 'Titulo',
  },
  {
    name: 'description',
    label: 'Descipción',
    multiline: true,
  },
  {
    name: 'image',
    placeholder: 'URL Image',
    type: 'file',
  },
]

const TYPES = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
}

const schema = yup
  .object({
    title: yup.string().required('Titulo obligatorio'),
    description: yup.string().required('Descripción obligatoria'),
    image: yup.mixed().required('Imagen Obligatoria'),
  })
  .required()

export { fields, schema, TYPES }
