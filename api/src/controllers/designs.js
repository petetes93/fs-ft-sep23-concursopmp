const { Design } = require('../models/design')
const mongoose = require('mongoose')

const getAll = async (req, res) => {
  try {
    const { author } = req.query

    const query = author ? { author: mongoose.Types.ObjectId(author) } : {}

    console.log(query)

    const designs = await Design.find(query).populate('vote_register')

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

  const design = await Design.findById(designId).populate('vote_register')
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

const update = async (req, res) => {
  try {
    const { designId } = req.params

    const existingDesign = await Design.find({
      _id: designId,
    })

    if (!existingDesign) {
      return res.status(404).json({ error: 'Diseño no encontrado' })
    }

    const updatedDesign = await Design.findByIdAndUpdate(
      designId,
      { ...req.body },
      { new: true }
    ).populate('vote_register')

    res.json(updatedDesign)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el diseño' })
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
}
