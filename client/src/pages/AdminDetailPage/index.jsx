import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDesign } from 'hooks'
import { toast } from 'react-toastify'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
  Paper,
  Container,
  IconButton,
} from '@mui/material'
import commentService from '../../services/comment-service'
import designService from '../../services/design-service'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import DeleteIcon from '@mui/icons-material/Delete'

const DetailsPage = () => {
  const { designId } = useParams()
  const navigate = useNavigate()
  const { design, loading, setDesign } = useDesign(designId)

  const handleComment = (commentId) => {
    commentService.update(commentId).then(() => {
      console.log('comentario ocultado')
      toast.success('comentario ocultado con éxito')

      const updatedComments = design.commentRegister.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, isDeleted: true }
        }
        return comment
      })

      setDesign((prevDesign) => ({
        ...prevDesign,
        commentRegister: updatedComments,
      }))
    })
  }

  const handleApprove = (designId) => {
    designService.showDesign(designId).then(() => {
      toast.success('Diseño aprobado')
      navigate(`/admindesigns/${design.contest._id}`)
    })
  }

  const handleReject = (designId) => {
    designService.hideDesign(designId).then(() => {
      toast.error('Diseño rechazado')
      navigate(`/admindesigns/${design.contest._id}`)
    })
  }

  if (loading) return <CircularProgress />

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIosIcon />}
        component={Link}
        to={`/admindesigns/${design.contest._id}`}
        sx={{ ml: 5, position: 'fixed' }}
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

            {design.commentRegister.length > 0 ? (
              design.commentRegister.map((comment) => {
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
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                      {!comment.isDeleted ? (
                        <IconButton
                          color="error"
                          aria-label="delete"
                          onClick={() => handleComment(comment._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        <Typography variant="caption" color="textSecondary">
                          Este comentario ha sido ocultado
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                )
              })
            ) : (
              <Paper
                elevation={3}
                style={{ padding: '16px', margin: '10px', width: '300px' }}
              >
                <Typography variant="body1" component="div">
                  No hay comentarios que moderar
                </Typography>
              </Paper>
            )}
            <Container sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ ml: 2, mb: 2 }}>
                Estado de aprovación
              </Typography>
              <Button
                variant="contained"
                color="success"
                sx={{ ml: 2, mb: 1 }}
                onClick={() => handleApprove(designId)}
              >
                Aprobar
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ ml: 2, mb: 1 }}
                onClick={() => handleReject(designId)}
              >
                Rechazar
              </Button>
            </Container>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailsPage
