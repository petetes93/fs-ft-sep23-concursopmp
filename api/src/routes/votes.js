const { Router } = require('express')
const voteController = require('../controllers/votes')

const validateParamId = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')

const router = Router()

router.post(
  '/:designId',
  auth,
  validate,
  validateParamId('designId'),
  voteController.addVote
)

router.put(
  '/:designId',
  auth,
  validateParamId('designId'),
  validate,
  voteController.updateVote
)

module.exports = router
