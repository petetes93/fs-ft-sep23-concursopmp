const mongoose = require('mongoose')
const { Vote } = require('../models/vote')
// const { addVote } = require('..controllers/designs')

const create = async (req, res) => {
  try {
    const userID = req.user.id
    const newVote = await Vote.create({
      ...req.body,
      user: new mongoose.Types.ObjectId(userID),
    })

    res.json(newVote)
  } catch (error) {
    res.status(500).json({ error: 'Error al añadir voto' })
  }
}

const update = async (req, res) => {
  try {
    const { voteId } = req.params

    const existingVote = await Vote.find({
      _id: voteId,
    })

    if (!existingVote) {
      return res.status(404).json({ error: 'No has votado' })
    }

    const updatedVote = await Vote.findByIdAndUpdate(
      voteId,
      { ...req.body },
      { new: true }
    )

    res.json(updatedVote)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el voto' })
  }
}

module.exports = { create, update }
