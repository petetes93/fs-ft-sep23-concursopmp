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

const activate = async (req, res, next) => {
  const currentDate = new Date()

  const activation = await Contest.updateMany(
    {
      $and: [
        { isActive: true },
        {
          $or: [
            { finishDate: { $lt: currentDate } },
            { startDate: { $gt: currentDate } },
          ],
        },
      ],
    },
    { $set: { isActive: false } }
  )

  const desactivation = await Contest.updateMany(
    {
      $or: [
        {
          startDate: { $lte: currentDate },
          finishDate: { $gte: currentDate },
        },
        { isActive: true },
      ],
    },
    { $set: { isActive: true } }
  )
  if (!activation && !desactivation) {
    return res
      .status(404)
      .json({ message: 'No se han actualizado correctamente los concursos' })
  }

  res.status(200).json({
    success: true,
    message: 'Se han actualizado correctamente los concursos.',
  })
}

const hideContest = async (req, res) => {
  try {
    const { contestId } = req.params

    const contest = await Contest.findById(contestId)
    if (!contest) {
      return res.status(404).json({ error: 'No se encuentra el comentario' })
    }

    contest.isDeleted = new Date()
    await contest.save()

    res.json(contest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al deshabilitar el comentario' })
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  activate,
  hideContest,
}
