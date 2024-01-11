const mongoose = require('mongoose')
const { body } = require('express-validator')

const commentSchema = new mongoose.Schema({
  commentDesign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Design',
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String },
  commentDate: { type: Date, required: true },
  isDeleted: { type: Date },
})

const Comment = mongoose.model('Comment', commentSchema)

const commentValidationSchema = [
  body('commentDate').notEmpty().isDate().withMessage('Se necesita una fecha'),
  body('punctuation')
    .notEmpty()
    .isNumeric()
    .withMessage('Se necesita una puntuación'),
]

exports.commentValidationSchema = commentValidationSchema
exports.Comment = Comment
