import React, { useState } from 'react'
import { Stack, Typography, Container, CssBaseline } from '@mui/material'
import { Form } from 'components'
import designService from 'services/design-service'
import { toast } from 'react-toastify'
import { schema, fields } from './form-data'
import { useAuth } from 'hooks'
import { useNavigate, useParams } from 'react-router-dom'

function DesignForm() {
  const navigate = useNavigate()
  const [, dispatch] = useAuth()
  const [erroresDesdeRespuesta, setErroresDesdeRespuesta] = useState([])
  const { contestId } = useParams()

  const handleFormSubmit = (designData) => {
    const formData = new FormData()
    designData.contest = contestId

    formData.append('title', designData.title)
    formData.append('description', designData.description)
    formData.append('image', designData.image)
    formData.append('contest', designData.contest)

    console.log(designData)

    designService
      .create(formData)
      .then((response) => {
        toast.success('Diseño creado exitosamente.')
        navigate('/', { replace: true })
      })
      .catch((err) => {
        console.log(err)
        toast.error('Necesitas estar registrado para subir un diseño')
        navigate('/login', { replace: true })
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Stack
        spacing={3}
        alignItems="center"
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
        <Typography variant="h2" component="h2" sx={{ marginBottom: '20px' }}>
          Crear Diseño
        </Typography>

        <Form
          inputs={fields}
          onSubmit={handleFormSubmit}
          validationSchema={schema}
          erroresDesdeRespuesta={erroresDesdeRespuesta}
          submitLabel="Crear Diseño"
          fieldWidth="10ch"
          sx={{ width: '100%' }}
        />
      </Stack>
    </Container>
  )
}

export default DesignForm
