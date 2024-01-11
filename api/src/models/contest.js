const mongoose = require('mongoose')
const { body } = require('express-validator')

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rules: { type: String, required: true },
  startDate: { type: Date, required: true },
  finishDate: { type: Date, required: true },
  theme: { type: String, required: true },
  isActive: { type: Boolean },
  creationDate: { type: Date },
  lastModification: { type: Date },
  isDeleted: { type: Date },
})

const Contest = mongoose.model('contest', contestSchema)

const commonValidationSchema = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('El nombre del concurso es obligatorio'),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('La descripción del concurso es obligatoria'),
  body('rules')
    .isString()
    .notEmpty()
    .withMessage('Las reglas del concurso son obligatorias'),
  body('startDate')
    .isDate()
    .notEmpty()
    .withMessage('La fecha de inicio es obligatoria'),
  body('finishDate')
    .isDate()
    .notEmpty()
    .withMessage('La fecha de finalización es obligatoria'),
  body('theme')
    .isString()
    .notEmpty()
    .withMessage('La temática del concurso es obligatoria'),
]

exports.Contest = Contest
exports.commonValidationSchema = commonValidationSchema
