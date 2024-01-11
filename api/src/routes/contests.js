const { Router } = require('express')
const contestController = require('../controllers/contests')
const { commonValidationSchema } = require('../models/contest')

const mongoIdFromParam = require('../middlewares/mongoIdFromParam')

const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const router = Router()

router.get('/', contestController.getAll)
router.get(
  '/:contestId',
  mongoIdFromParam('contestId'),
  validate,
  contestController.getOne
)

router.post(
  '/',
  auth,
  admin,
  commonValidationSchema,
  validate,
  contestController.create
)

router.put(
  '/:contestId',
  auth,
  admin,
  mongoIdFromParam('contestId'),
  commonValidationSchema,
  validate,
  contestController.update
)

module.exports = router
