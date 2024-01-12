const mongoose = require('mongoose')
const { body } = require('express-validator')

const voteSchema = new mongoose.Schema({
  votedDesign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Design',
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  voteDate: { type: Date, required: true },
  punctuation: {
    type: Number,
    required: true,
    validate: {
      validator: value => Number.isInteger(value) && value >= 0 && value <= 5,
      message: 'La puntuación debe ser un número entero entre de 0 a 5',
    },
  },
  lastModification: { type: Date },
})

const Vote = mongoose.model('Vote', voteSchema)

const voteValidationSchema = [
  body('voteDate').notEmpty().isDate().withMessage('Se necesita una fecha'),
  body('punctuation')
    .notEmpty()
    .isInt({ min: 0, max: 5 })
    .withMessage('La puntuación debe ser un número entero entre 0 a 5'),
]

exports.voteValidationSchema = voteValidationSchema
exports.Vote = Vote
