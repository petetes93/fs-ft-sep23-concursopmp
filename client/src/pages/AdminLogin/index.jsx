import React, { useState } from 'react'
import { Stack, Typography, Link, Container, CssBaseline } from '@mui/material'

import { Form } from 'components'
import { login } from 'services/auth-service'
import { toast } from 'react-toastify'
import { schema, fields } from './form-data'
// import { useAuth } from 'hooks'
import { useNavigate } from 'react-router-dom'

function LoginAdmin() {
  const navigate = useNavigate()
  //   const [, dispatch] = useAuth()
  const [erroresDesdeRespuesta, setErroresDesdeRespuesta] = useState([])

  const IniciarSesionAdmin = (usuario) => {
    login(usuario)
      .then((decodedJWT) => {
        const { isAdmin } = decodedJWT
        if (isAdmin) {
          const tipo = 'admin'

          navigate('/Dashboard', { replace: true })
        } else {
          toast.error('No tienes privilegios de administrador.')
        }
      })
      .catch((err) => {
        const { data, status } = err.response

        if (Array.isArray(data) && status === 400)
          setErroresDesdeRespuesta(err.response.data)
        else toast.error(data.message)
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
          '@media (max-width: 600px)': {
            padding: '20px',
            minHeight: '100vh',
            marginTop: '100px',
            marginBottom: '50px',
          },
        }}
      >
        <Typography variant="h2" component="h2">
          Panel de Administradores
        </Typography>

        <Form
          inputs={fields}
          onSubmit={IniciarSesionAdmin}
          validationSchema={schema}
          erroresDesdeRespuesta={erroresDesdeRespuesta}
          submitLabel="Enviar"
          fieldWidth="10ch"
        />
      </Stack>
    </Container>
  )
}

export default LoginAdmin
