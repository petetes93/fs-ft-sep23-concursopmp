import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDesign, useAuth } from 'hooks'
import { toast } from 'react-toastify'
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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import voteService from '../../services/vote-service'
import commentService from '../../services/comment-service'

const DetailsPage = () => {
  const { designId } = useParams()
  const [newComment, setNewComment] = useState('')
  const [selectedRating, setSelectedRating] = useState(0)
  const [{ id, username }] = useAuth()

  const { design, loading, setDesign } = useDesign(designId)

  useEffect(() => {
    if (!loading) {
      const userVote = design.voteRegister.find((vote) => vote.user === id)
      if (userVote) {
        setSelectedRating(userVote.punctuation)
      }
    }
  }, [loading, design.voteRegister, id])

  const handleVote = (value) => {
    console.log(`Votaste con ${value} estrellas`)
    setSelectedRating(value)
    if (!design.voteRegister.find((vote) => vote.user === id))
      voteService
        .addVote(designId, { punctuation: selectedRating })
        .then(() => toast.success('Tu voto ha sido registrado'))
        .catch((err) => console.log(err))

    voteService
      .update(designId, { punctuation: selectedRating })
      .then(() => {
        setNewComment('')
        toast.success('Tu voto ha sido actualizado')
      })
      .catch((err) => console.log(err))
  }

  const handleSubmit = () => {
    commentService
      .addComment(designId, { text: newComment })
      .then(() => {
        console.log('Comentario Enviado')

        setDesign((prevDesign) => ({
          ...prevDesign,
          commentRegister: [
            ...prevDesign.commentRegister,
            {
              user: { username: username },
              commentDate: new Date(),
              text: newComment,
            },
          ],
        }))

        setNewComment('')
      })
      .catch((err) => console.log(err))
  }

  if (loading) return <CircularProgress />

  console.log(design.contest)
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIosIcon />}
        component={Link}
        to={`/contest/${design.contest._id}`}
        sx={{
          ml: 5,
          mt: 5,
          backgroundColor: '#D7DBDD',
          height: '29%',
          color: 'black',
        }}
      >
        Volver
      </Button>
      <Card
        sx={{
          mt: '3rem',
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

          {design.contest.isActive ? (
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
          ) : (
            ''
          )}

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
              design.commentRegister
                .filter((comment) => !comment.isDeleted)
                .map((comment) => {
                  const totalDate = new Date(comment.commentDate)

                  const commentDate = `${totalDate.getDate()}-${
                    totalDate.getMonth() + 1
                  }-${totalDate.getFullYear()} ${
                    totalDate.getHours() + 1
                  }:${totalDate.getMinutes()}`

                  return (
                    <Paper
                      elevation={3}
                      style={{
                        padding: '16px',
                        margin: '10px',
                        width: '300px',
                      }}
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
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              sx={{ width: '20%', mt: '2rem' }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
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
