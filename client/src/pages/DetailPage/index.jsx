import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
  CircularProgress,
  Paper,
  Rating,
} from '@mui/material'

import { useDesign, useAuth } from 'hooks'

import voteService from '../../services/vote-service'

// import commentService from 'services'

const DetailsPage = () => {
  const { designId } = useParams()
  const [newComment, setNewComment] = useState('')
  const [selectedRating, setSelectedRating] = useState(0)
  const [{ id }] = useAuth()

  const { design, loading, setDesign } = useDesign(designId)

  if (loading) return <CircularProgress />

  const handleVote = value => {
    console.log(`Votaste con ${value} estrellas`)
    setSelectedRating(value)
    if (!design.voteRegister.find(vote => vote.user === id))
      voteService
        .addVote(designId, { punctuation: selectedRating })
        .then(() => console.log('El voto ha sido registrado'))
        .catch(err => console.log(err))
  }

  return (
    <div>
      <Card
        sx={{
          mt: '6rem',
          width: '60%',
          ml: '20%',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: '3rem',
            }}
          >
            {design.title}
          </Typography>
          <Divider
            style={{
              marginBottom: '25px',
              width: '80%',
              margin: '0 auto',
              backgroundColor: 'grey',
              opacity: '0.5',
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '2%' }}>
            <Typography variant="body1">{design.author.username}</Typography>
          </Box>

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-start', mt: '3rem' }}
          >
            <img src={design.image} style={{ width: '100%', height: 'auto' }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '2%' }}>
            <Typography variant="body1">{design.description}</Typography>
          </Box>

          <div>
            <p>Tu calificación: {selectedRating} estrellas</p>
            <Rating
              name="voting-stars"
              value={selectedRating}
              precision={1}
              onChange={(event, value) => setSelectedRating(value)}
            />
            <Button
              variant="contained"
              sx={{ ml: 2, mb: 1 }}
              onClick={() => handleVote(selectedRating)}
            >
              Votar
            </Button>
          </div>

          {/* Información del autor */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{ mt: 2 }}>
              Comentarios
            </Typography>
            {/* AQUI VAN LOS COMENTARIOS DE LA DB  */}

            {design.commentRegister.length > 0 ? (
              design.commentRegister.map(comment => {
                const totalDate = new Date(comment.commentDate)

                const commentDate = `${totalDate.getDate()}-${
                  totalDate.getMonth() + 1
                }-${totalDate.getFullYear()}`

                return (
                  <Paper
                    elevation={3}
                    style={{ padding: '16px', margin: '10px', width: '300px' }}
                  >
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {comment.user.username}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {commentDate}
                      </Typography>
                    </Box>
                    <Typography variant="body1" component="div">
                      {comment.text}
                    </Typography>
                  </Paper>
                )
              })
            ) : (
              <Paper
                elevation={3}
                style={{ padding: '16px', margin: '10px', width: '300px' }}
              >
                <Typography variant="body1" component="div">
                  ¡Sé el primero en añadir un comentario!
                </Typography>
              </Paper>
            )}

            <div style={{ marginTop: '2rem' }}>
              {/* <div>
                {place.comments.map((comment, index) => (
                  <Typography key={index} variant="body2">
                    {comment.comment}
                  </Typography>
                ))}
              </div> */}
            </div>
            <Typography variant="h6">Añadir Comentario</Typography>

            <TextField
              label="Nuevo comentario"
              multiline
              rows={3}
              sx={{ width: '60%', mt: '2rem' }}
              // value={newComment}
              // onChange={handleCommentChange}
            />
            <Button
              sx={{ width: '20%', mt: '2rem' }}
              variant="contained"
              color="primary"
              // onClick={handleAddComment}
            >
              Agregar Comentario
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailsPage
