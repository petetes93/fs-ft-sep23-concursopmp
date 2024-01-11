const mongoose = require('mongoose')
const { body } = require('express-validator')

const commentSchema = new mongoose.Schema({
  commentedDesign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Design',
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  commentDate: { type: Date, required: true },
  isDeleted: { type: Date },
})

const Comment = mongoose.model('Comment', commentSchema)

const commentValidationSchema = [
  body('text').notEmpty().isString().withMessage('Se necesita un comentario'),
]

exports.commentValidationSchema = commentValidationSchema
exports.Comment = Comment
