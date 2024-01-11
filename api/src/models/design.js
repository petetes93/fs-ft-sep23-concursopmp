const mongoose = require('mongoose')
const { body } = require('express-validator')

const designSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  upload_date: { type: Date, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' },
  vote_register: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
  approval_date: { type: Date },
  last_modification: { type: Date },
  isDeleted: { type: Date },
})

const Design = mongoose.model('Design', designSchema)

const designValidationSchema = [
  body('title')
    .notEmpty()
    .isString()
    .withMessage('Se necesita un título para el diseño'),
  body('image')
    .notEmpty()
    .isString()
    .withMessage('Se necesita una imagen para el diseño'),
  body('upload_date')
    .notEmpty()
    .isDate()
    .withMessage('Se necesita una fecha de subida para el diseño'),
]

exports.designValidationSchema = designValidationSchema
exports.Design = Design
