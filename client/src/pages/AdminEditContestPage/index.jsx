import React, { useContext, useEffect, useState } from 'react'
import {
  Stack,
  Typography,
  Container,
  CssBaseline,
  CircularProgress,
} from '@mui/material'
import { Form } from 'components'

import { toast } from 'react-toastify'
import { editFields, editSchema, getDefaultValues } from './edit-form-data'
import { useNavigate, useParams } from 'react-router-dom'
import contestService from 'services/contest-service'
import { useContest } from 'hooks'

function AdminEditContest() {
  const navigate = useNavigate()
  const { contestId } = useParams()
  const { contest, loadingContest } = useContest(contestId)
  const [errorsFromResponse, setErrorsFromResponse] = useState([])

  const handleEditContest = (contest) => {
    const formData = new FormData()

    formData.append('name', contest.name)
    formData.append('image', contest.image)
    formData.append('rules', contest.rules)
    formData.append('description', contest.description)
    formData.append('startDate', contest.startDate)
    formData.append('finishDate', contest.finishDate)
    formData.append('theme', contest.theme)

    contestService
      .update(contestId, formData)
      .then(() => {
        console.log(contest, 'este es el enviado'), navigate('/admincontest')
      })
      .catch((err) => {
        console.error('Error al enviar la solicitud:', err)
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data)
      })
  }
  if (loadingContest) return <CircularProgress />
  const defaultValues = getDefaultValues(contest)
  defaultValues.startDate = new Date(contest.startDate)
    .toISOString()
    .split('T')[0]
  defaultValues.finishDate = new Date(contest.finishDate)
    .toISOString()
    .split('T')[0]
  console.log(defaultValues)

  // const handleInputChange = (name, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }))
  // }

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
          '& legend': { display: 'none' },
          '& .MuiInputLabel-shrink': {
            opacity: 0,
            transition: 'all 0.1s ease-in',
          },
        }}
      >
        <Typography variant="h2" component="h2" sx={{ marginBottom: '20px' }}>
          Editar concurso
        </Typography>

        <Form
          inputs={editFields}
          onSubmit={handleEditContest}
          validationSchema={editSchema}
          errorsFromResponse={errorsFromResponse}
          submitLabel="Guardar Cambios"
          fieldWidth="10ch"
          defaultValues={defaultValues}
          sx={{ width: '100%' }}
        />
      </Stack>
    </Container>
  )
}

export default AdminEditContest
