const mongoose = require('mongoose')
const { body } = require('express-validator')

const voteSchema = new mongoose.Schema({
  voted_design: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vote_date: { type: Date, required: true },
  punctuation: { type: Number, required: true },
  last_modification: { type: Date },
  isDeleted: { type: Date },
})

const Vote = mongoose.model('Vote', voteSchema)

const voteValidationSchema = [
  body('vote_date').notEmpty().isDate().withMessage('Se necesita una fecha'),
  body('punctuation')
    .notEmpty()
    .isNumeric()
    .withMessage('Se necesita una puntuación'),
]

exports.voteValidationSchema = voteValidationSchema
exports.Vote = Vote
