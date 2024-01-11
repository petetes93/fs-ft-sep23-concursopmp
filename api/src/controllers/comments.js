const { Comment } = require('../models/comment')
const { Design } = require('../models/design')
const mongoose = require('mongoose')

const addComment = async (req, res) => {
  try {
    const { designId } = req.params
    const userId = req.user.id
    const text = req.body.text

    const design = await Design.findById(designId)
    if (!design) {
      return res.status(404).json({ error: 'Diseño no encontrado' })
    }

    const existingComment = await Comment.findOne({
      commentDesign: designId,
      user: userId,
    })
    if (existingComment) {
      return res.status(400).json({ error: 'Ya has comentado este diseño' })
    }

    const comment = await Comment.create({
      commentDesign: designId,
      user: userId,
      commentDate: new Date(),
      text: text,
    })

    await comment.save()

    res.json(comment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el comentario' })
  }
}
