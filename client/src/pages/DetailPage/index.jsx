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
} from '@mui/material'

import { useDesign } from 'hooks'

import commentService from '../../services/comment-service'

const DetailsPage = () => {
  const { designId } = useParams()
  const [newComment, setNewComment] = useState('')

  const { design, loading, setDesign } = useDesign(designId)

  if (loading) return <CircularProgress />

  console.log(design)

  // const handleCommentChange = event => {
  //   setNewComment(event.target.value)
  // }

  // const handleAddComment = async () => {
  //   try {
  //     await commentService.create({ comment: newComment }).then(res => {
  //       console.log('creado', res.data)
  //       setDesigns({ ...designs, comments: [...designs.comments, res.data] })
  //     })
  //     setNewComment('')
  //   } catch (error) {
  //     console.error('Error adding comment:', error)
  //   }
  // }

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

          {/* Información del autor */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">Comentarios</Typography>
            {/* AQUI VAN LOS COMENTARIOS DE LA DB  */}

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
