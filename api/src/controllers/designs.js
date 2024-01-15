const { Design } = require('../models/design')
const mongoose = require('mongoose')
const { Contest } = require('../models/contest')

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

    const { path: image, filename: imageCloudinaryId } = req.file

    const newDesign = await Design.create({
      ...req.body,
      image,
      imageCloudinaryId,
      uploadDate: new Date(),
      author: new mongoose.Types.ObjectId(userID),
    })

    res.json(newDesign)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el diseño' })
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
  hideDesign,
  showDesign,
}
