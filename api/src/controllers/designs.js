const { Design } = require('../models/design')
const mongoose = require('mongoose')
const { Vote } = require('../models/vote')

const getAll = async (req, res) => {
  try {
    const { author } = req.query

    let query = {}

    if (author) {
      query.author = author
    }

    console.log(query)

    const designs = await Design.find(query).populate(
      'voteRegister',
      '-votedDesign'
    )

    if (designs.length === 0) {
      return res.status(404).json({ message: 'No hay diseños disponibles' })
    }

    res.json(designs)
  } catch (error) {
    return res.status(500).json({ message: 'Algo inesperado ha ocurrido' })
  }
}

const getById = async (req, res) => {
  const { designId } = req.params

  const design = await Design.findById(designId).populate('voteRegister')
  if (!design) {
    return res.status(404).json({ message: 'No se encuentra el diseño' })
  }

  res.json(design)
}

const create = async (req, res) => {
  try {
    const userID = req.user.id
    const newDesign = await Design.create({
      ...req.body,
      author: new mongoose.Types.ObjectId(userID),
    })

    res.json(newDesign)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el diseño' })
  }
}

const addVote = async (req, res) => {
  try {
    const { designId } = req.params
    const userId = req.user.id
    const punctuation = req.body.punctuation

    const design = await Design.findById(designId)
    if (!design) {
      return res.status(404).json({ error: 'Diseño no encontrado' })
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
    await design.save()

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

    const existingVote = await Vote.findOne({
      votedDesign: designId,
      user: userId,
    })

    if (!existingVote) {
      return res.status(404).json({ error: 'No has votado por este diseño' })
    }

    existingVote.punctuation = newPunctuation
    existingVote.voteDate = new Date()
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

const hideDesign = async (req, res) => {
  try {
    const { designId } = req.params

    const design = await Design.findById(designId)
    if (!design) {
      return res.status(404).json({ error: 'Diseño no encontrado' })
    }

    design.isDeleted = new Date()
    await design.save()

    res.json({ message: 'El diseño ha sido rechazado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al deshabilitar el diseño' })
  }
}

const showDesign = async (req, res) => {
  try {
    const { designId } = req.params

    const design = await Design.findById(designId)
    if (!design) {
      return res.status(404).json({ error: 'Diseño no encontrado' })
    }

    design.approvalDate = new Date()
    await design.save()

    res.json({ message: 'El diseño ha sido aceptado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al habilitar el diseño' })
  }
}

module.exports = {
  getAll,
  getById,
  create,
  addVote,
  hideDesign,
  showDesign,
  updateVote,
}
