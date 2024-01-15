const mongoose = require('mongoose')
const { body } = require('express-validator')

const createUploader = require('../utils/multer')

const designSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  imageCloudinaryId: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' },
  voteRegister: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
  commentRegister: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
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
  // body('image')
  //   .notEmpty()
  //   .isString()
  //   .withMessage('Se necesita una imagen para el diseño'),
  // body('uploadDate')
  //   .notEmpty()
  //   .isDate()
  //   .withMessage('Se necesita una fecha de subida para el diseño'),
]

const TYPES = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
}

exports.designValidationSchema = designValidationSchema
exports.Design = Design
exports.uploadImage = createUploader(TYPES).single('image')
