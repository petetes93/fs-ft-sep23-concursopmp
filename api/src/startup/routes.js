require('express-async-errors')
const { json } = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')

module.exports = function (app) {
  app.use(helmet())
  app.use(compression())
  app.use(cors())
  app.use(json())
  app.use(morgan('dev'))

  app.use('/api/user', require('../routes/users'))
  app.use('/api/contest', require('../routes/contests'))
  app.use('/api/design', require('../routes/designs'))
  app.use('/api/vote', require('../routes/votes'))
  app.use('/api/comment', require('../routes/comments'))

  app.get('/ping', (req, res) => {
    res.send({ success: true })
  })

  app.use(require('../middlewares/errors'))
}
