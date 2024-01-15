const { Router } = require('express')
const contestController = require('../controllers/contests')
const { commonValidationSchema, uploadImage } = require('../models/contest')

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
  uploadImage,
  commonValidationSchema,
  validate,
  contestController.create
)

router.put('/', auth, admin, validate, contestController.activate)

router.put('/delete/:contestId', auth, admin, contestController.hideContest)

router.put(
  '/:contestId',
  auth,
  admin,
  uploadImage,
  mongoIdFromParam('contestId'),
  commonValidationSchema,
  validate,
  contestController.update
)

module.exports = router
