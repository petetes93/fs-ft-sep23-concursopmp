const { Vote } = require('../models/vote')
const { Design } = require('../models/design')
const { Contest } = require('../models/contest')

const addVote = async (req, res) => {
  try {
    const { designId } = req.params
    const userId = req.user.id
    const punctuation = req.body.punctuation

    const design = await Design.findById(designId)
    if (!design) {
      return res.status(404).json({ error: 'Diseño no encontrado' })
    }

    const contest = await Contest.findById(design.contest)
    if (!contest || !contest.isActive) {
      return res.status(400).json({ error: 'El concurso no está activo' })
    }

    const existingVote = await Vote.findOne({
      votedDesign: designId,
      user: userId,
    })
    if (existingVote) {
      return res.status(400).json({ error: 'Ya has votado por este diseño' })
    }

    const vote = await Vote.create({
      votedDesign: designId,
      user: userId,
      voteDate: new Date(),
      punctuation: punctuation,
    })

    design.voteRegister.push(vote._id)
    const Saved = await design.save()

    if (!Saved) {
      res.status(500).json({ error: 'Error al agregar el voto' })
    }

    const updatedDesign = await Design.findById(designId).populate(
      'voteRegister'
    )

    res.json(updatedDesign)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al agregar el voto' })
  }
}

const updateVote = async (req, res) => {
  try {
    const { designId } = req.params
    const userId = req.user.id
    const newPunctuation = req.body.punctuation

    const design = await Design.findById(designId)
    if (!design) {
      return res.status(404).json({ error: 'Diseño no encontrado' })
    }

    const contest = await Contest.findById(design.contest)
    if (!contest || !contest.isActive) {
      return res.status(400).json({ error: 'El concurso no está activo' })
    }

    const existingVote = await Vote.findOne({
      votedDesign: designId,
      user: userId,
    })

    if (!existingVote) {
      return res.status(404).json({ error: 'No has votado por este diseño' })
    }

    existingVote.punctuation = newPunctuation
    existingVote.lastModification = new Date()
    await existingVote.save()

    const updatedDesign = await Design.findById(designId).populate(
      'voteRegister'
    )

    res.json(updatedDesign)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el voto' })
  }
}

module.exports = { addVote, updateVote }
