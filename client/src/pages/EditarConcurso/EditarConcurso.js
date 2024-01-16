// EditarConcurso.js

import React, { useState, useEffect } from 'react'
import { Stack, Typography, Container, CssBaseline } from '@mui/material'
import { Form } from 'components'
// import { getConcurso, updateConcurso } from 'services/concurso-service'
import { toast } from 'react-toastify'
import { schema as editSchema, fields as editFields } from './edit-form-data'
import { useNavigate, useParams } from 'react-router-dom'

function EditarConcurso() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [erroresDesdeRespuesta, setErroresDesdeRespuesta] = useState([])
  const [concursoData, setConcursoData] = useState(null)

  useEffect(() => {
    getConcurso(id)
      .then((concurso) => {
        setConcursoData(concurso)
      })
      .catch((error) => {
        console.error('Error al obtener los datos del concurso:', error)
        toast.error('Error al obtener los datos del concurso.')
      })
  }, [id])

  const handleEditarConcurso = (datos) => {
    updateConcurso(id, datos)
      .then(() => {
        toast.success('Concurso actualizado exitosamente')
        navigate('/') // Puedes redirigir a la página principal u otra vista después de la edición
      })
      .catch((error) => {
        console.error('Error al actualizar el concurso:', error)
        const { data, status } = error.response
        if (Array.isArray(data) && status === 400) {
          setErroresDesdeRespuesta(data)
        } else {
          toast.error(data.message)
        }
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
          '& legend': { display: 'none' },
          '& .MuiInputLabel-shrink': {
            opacity: 0,
            transition: 'all 0.1s ease-in',
          },
        }}
      >
        <Typography variant='h2' component='h2' sx={{ marginBottom: '20px' }}>
          Editar concurso
        </Typography>

        {concursoData && (
          <Form
            inputs={editFields}
            onSubmit={handleEditarConcurso}
            validationSchema={editSchema}
            erroresDesdeRespuesta={erroresDesdeRespuesta}
            submitLabel='Guardar Cambios'
            fieldWidth='10ch'
            defaultValues={concursoData}
            sx={{ width: '100%' }}
          />
        )}
      </Stack>
    </Container>
  )
}

export default EditarConcurso
