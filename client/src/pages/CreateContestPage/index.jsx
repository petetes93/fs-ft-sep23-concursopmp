import React, { useState } from 'react'
import { Stack, Typography, Container, CssBaseline } from '@mui/material'
import { Form } from 'components'
import contestService from 'services/contest-service'
import { toast } from 'react-toastify'
import { schema, fields } from './form-data'
import { useAuth } from 'hooks'
import { useNavigate } from 'react-router-dom'

function ConcursoForm() {
  const navigate = useNavigate()
  const [, dispatch] = useAuth()
  const [erroresDesdeRespuesta, setErroresDesdeRespuesta] = useState([])

  const handleFormSubmit = (concursoData) => {
    console.log(concursoData)

    const formData = new FormData()

    formData.append('name', concursoData.name)
    formData.append('image', concursoData.image)
    formData.append('rules', concursoData.rules)
    formData.append('description', concursoData.description)
    formData.append('startDate', concursoData.startDate)
    formData.append('finishDate', concursoData.finishDate)
    formData.append('theme', concursoData.theme)

    contestService
      .create(formData)
      .then((response) => {
        toast.success('Concurso creado exitosamente.')
        navigate('/admincontest', { replace: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Stack
        spacing={3}
        alignItems='center'
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '10px',
          marginTop: '100px',
          marginBottom: '50px',
        }}
      >
        <Typography variant='h2' component='h2' sx={{ marginBottom: '20px' }}>
          Crear Concurso
        </Typography>

        <Form
          inputs={fields}
          onSubmit={handleFormSubmit}
          validationSchema={schema}
          erroresDesdeRespuesta={erroresDesdeRespuesta}
          submitLabel='Crear Concurso'
          fieldWidth='10ch'
          sx={{ width: '100%' }}
        />
      </Stack>
    </Container>
  )
}

export default ConcursoForm
