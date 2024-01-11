const { Contest } = require('../models/contest')

const getAll = (req, res, next) => {
  const { theme } = req.query

  const query = theme ? { theme } : {}

  Contest.find(query)
    .then((contests) => {
      res.json(contests)
    })
    .catch((error) => {
      next(error)
    })
}

const getOne = async (req, res) => {
  const { contestId } = req.params

  const contest = await Contest.findById(contestId)
  if (!contest) {
    return res.status(404).json({ message: 'concurso no encontrado' })
  }

  res.json(contest)
}

const create = async (req, res) => {
  const newcontest = await Contest.create({
    ...req.body,
  })
  res.json(newcontest)
}

const update = async (req, res) => {
  const { contestId } = req.params

  const updates = { ...req.body }
  const oldcontest = await Contest.findByIdAndUpdate(contestId, updates)
  if (!oldcontest) {
    return res.status(404).json({ message: 'concurso no encontrado' })
  }
  const updatedcontest = { contestId, ...updates }

  res.json(updatedcontest)
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
}
