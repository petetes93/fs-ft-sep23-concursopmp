import { useState } from 'react'
import { Stack, Typography, Container, Link, CssBaseline } from '@mui/material'

import { Form } from 'components'

import { register } from 'services/auth-service'

import { toast } from 'react-toastify'

import { schema, fields } from './form-data'

import { useAuth } from 'hooks'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()
  const [, dispatch] = useAuth()

  const [errorsFromResponse, setErrorsFromResponse] = useState([])

  const onSubmit = (user) => {
    register(user)
      .then((decodedJWT) => {
        const { username, isAdmin } = decodedJWT

        const type = isAdmin ? 'admin' : 'login'

        dispatch({ type, username })
        navigate('/', { replace: true })
      })
      .catch((err) => {
        const { data, status } = err.response

        if (Array.isArray(data) && status === 400)
          setErrorsFromResponse(err.response.data)
        else toast.error(data.message)
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
          '@media (max-width: 600px)': {
            padding: '20px',
            minHeight: '100vh',
            marginTop: '100px',
            marginBottom: '50px',
          },
        }}
      >
        <Typography variant='h2' component='h2'>
          Crear una cuenta
        </Typography>

        <Form
          inputs={fields}
          onSubmit={onSubmit}
          validationSchema={schema}
          errorsFromResponse={errorsFromResponse}
          submitLabel='Registrar'
        />

        <Stack direction='row' spacing={1}>
          <Typography variant='body2'>
            ¿Tienes una cuenta?{' '}
            <Link href='/login' color='primary'>
              Inicia sesión
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  )
}

export default RegisterPage
