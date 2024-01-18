import React, { useState } from 'react'
import { useDesigns } from 'hooks'
import { Link, useParams } from 'react-router-dom'
import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import 'react-toastify/dist/ReactToastify.css'

function AdminDesignPage() {
  const { contestId } = useParams()
  const { designs, loading } = useDesigns()
  const [searchTerm, setSearchTerm] = useState('')

  if (loading) return <CircularProgress />

  const matchedDesigns = designs.filter(
    (design) => design.contest === contestId
  )

  const filteredDesigns = matchedDesigns.filter((design) =>
    design.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ marginTop: '40px', marginBottom: '40px' }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" component="h4">
          Lista de Diseños
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Stack direction="row" alignItems="center">
            <TextField
              label="Buscar diseños"
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: 'white',
                width: '200px',
                marginRight: '20px',
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admincontest"
            sx={{ backgroundColor: '#616A6B' }}
          >
            Ir a Concursos
          </Button>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/adminuser"
            sx={{ backgroundColor: '#D7DBDD' }}
          >
            Ir a Usuarios
          </Button>
        </Stack>
        {filteredDesigns.map((design) => (
          <Stack
            key={design._id}
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              width: '100%',
              backgroundColor: 'white',
            }}
          >
            <Typography variant="body1">Diseño: {design.title}</Typography>

            <Stack direction="row" spacing={1}>
              <Typography variant="body1">
                {design.isDeleted
                  ? design.approvalDate
                    ? new Date(design.isDeleted) > new Date(design.approvalDate)
                      ? 'Rechazado'
                      : 'Aprobado'
                    : 'Rechazado'
                  : design.approvalDate
                  ? 'Aprobado'
                  : 'Pendiente de aprobación'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                startIcon={<AccountBoxIcon />}
                to={`/admindesign/${design._id}`}
                sx={{ fontSize: '0.8rem', backgroundColor: '#34495E' }}
              >
                Moderar Diseño
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  )
}
export default AdminDesignPage
