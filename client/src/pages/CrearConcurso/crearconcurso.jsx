import React, { useState } from 'react'
import { Stack, Typography, Link, Container, CssBaseline } from '@mui/material'

import { Form } from 'components'
import { login } from 'services/auth-service'
import { toast } from 'react-toastify'
import { schema, fields } from './form-data'
// import { useAuth } from 'hooks'
import { useNavigate } from 'react-router-dom'

function ConcursoForm() {
  const navigate = useNavigate()
  //   const [, dispatch] = useAuth()
  const [erroresDesdeRespuesta, setErroresDesdeRespuesta] = useState([])

  const ConcursoForm = (usuario) => {
    // login(usuario)
    //   .then((decodedJWT) => {
    //     const { isAdmin } = decodedJWT
    //     if (isAdmin) {
    //       const tipo = 'admin'
    //       navigate('/', { replace: true })
    //     } else {
    //       toast.error('No tienes privilegios de administrador.')
    // }
    //   })
    //   .catch((err) => {
    //     const { data, status } = err.response
    //     if (Array.isArray(data) && status === 400)
    //       setErroresDesdeRespuesta(err.response.data)
    //     else toast.error(data.message)
    //   })
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
          '& legend': { display: 'none' },
          '& .MuiInputLabel-shrink': {
            opacity: 0,
            transition: 'all 0.1s ease-in',
          },
          '@media (max-width: 600px)': {
            padding: '20px',
            minHeight: '100vh',
            marginTop: '100px',
            marginBottom: '50px',
          },
        }}
      >
        <Typography variant='h2' component='h2' sx={{ marginBottom: '20px' }}>
          Crear concurso
        </Typography>

        <Form
          inputs={fields}
          onSubmit={ConcursoForm}
          validationSchema={schema}
          erroresDesdeRespuesta={erroresDesdeRespuesta}
          submitLabel='Enviar'
          fieldWidth='10ch'
          sx={{ width: '100%' }}
        />
      </Stack>
    </Container>
  )
}

export default ConcursoForm
