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
  punctuation: { type: Number, required: true },
  lastModification: { type: Date },
})

const Vote = mongoose.model('Vote', voteSchema)

const voteValidationSchema = [
  body('voteDate').notEmpty().isDate().withMessage('Se necesita una fecha'),
  body('punctuation')
    .notEmpty()
    .isNumeric()
    .withMessage('Se necesita una puntuación'),
]

exports.voteValidationSchema = voteValidationSchema
exports.Vote = Vote
