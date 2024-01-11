const mongoose = require('mongoose')
const { body } = require('express-validator')

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rules: { type: String, required: true },
  start_date: { type: Date, required: true },
  finish_date: { type: Date, required: true },
  theme: { type: String, required: true },
  isActive: { type: Boolean },
  approval_date: { type: Date },
  last_modification: { type: Date },
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
  body('start_date')
    .isDate()
    .notEmpty()
    .withMessage('La fecha de inicio es obligatoria'),
  body('finish_date')
    .isDate()
    .notEmpty()
    .withMessage('La fecha de finalización es obligatoria'),
  body('theme')
    .isString()
    .notEmpty()
    .withMessage('La temática del concurso es obligatoria'),
  body('creation_date')
    .isDate()
    .notEmpty()
    .withMessage('La fecha de creación es obligatoria'),
]

exports.Contest = Contest
exports.commonValidationSchema = commonValidationSchema
