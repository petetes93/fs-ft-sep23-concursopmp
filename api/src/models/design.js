const mongoose = require('mongoose')
const { body } = require('express-validator')

const designSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' },
  voteRegister: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
  approvalDate: { type: Date },
  lastModification: { type: Date },
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
  body('uploadDate')
    .notEmpty()
    .isDate()
    .withMessage('Se necesita una fecha de subida para el diseño'),
]

exports.designValidationSchema = designValidationSchema
exports.Design = Design
