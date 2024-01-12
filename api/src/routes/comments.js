const { Router } = require('express')
const commentController = require('../controllers/comments')
const { commentValidationSchema } = require('../models/comment')

const validateParamId = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const router = Router()

router.post(
  '/:designId',
  auth,
  validateParamId('designId'),
  commentValidationSchema,
  validate,
  commentController.addComment
)

router.put(
  '/:commentId',
  auth,
  admin,
  validateParamId('commentId'),
  validate,
  commentController.hideComment
)

module.exports = router
