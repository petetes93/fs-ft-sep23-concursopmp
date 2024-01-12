const { Router } = require('express')
const designController = require('../controllers/designs')
const { designValidationSchema } = require('../models/design')

const validateParamId = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const router = Router()

router.get('/', designController.getAll)
router.get(
  '/:designId',
  validateParamId('designId'),
  validate,
  designController.getById
)

router.post(
  '/',
  auth,
  designValidationSchema,
  validate,
  designController.create
)

router.put(
  '/addvote/:designId',
  auth,
  validateParamId('designId'),
  validate,
  designController.addVote
)

router.put(
  '/updatevote/:designId',
  auth,
  validateParamId('designId'),
  validate,
  designController.updateVote
)

router.put(
  '/hidedesign/:designId',
  auth,
  admin,
  validateParamId('designId'),
  validate,
  designController.hideDesign
)

router.put(
  '/showdesign/:designId',
  auth,
  admin,
  validateParamId('designId'),
  validate,
  designController.showDesign
)

module.exports = router
