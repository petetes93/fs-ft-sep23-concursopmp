const { Router } = require('express')
const voteController = require('../controllers/votes')
const { voteValidationSchema } = require('../models/vote')

const validateParamId = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')

const router = Router()

router.post('/', auth, voteValidationSchema, validate, voteController.create)

router.put(
  '/:voteId',
  auth,
  validateParamId('voteId'),
  voteValidationSchema,
  validate,
  voteController.update
)

module.exports = router
