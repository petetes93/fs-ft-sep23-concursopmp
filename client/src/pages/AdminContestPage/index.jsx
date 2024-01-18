import React, { useEffect, useState } from 'react'
import { useContests } from 'hooks'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import contestService from '../../services/contest-service'
import 'react-toastify/dist/ReactToastify.css'

function AdminContestPage() {
  const { contests, loading, setContests } = useContests()
  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [selectedContestId, setSelectedContestId] = useState(null)

  if (loading) return <CircularProgress />

  const filteredContests = contests.filter((contest) =>
    contest.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const suspendContest = (contestId) => {
    openDeleteModal(contestId)
  }

  const confirmSuspendContest = () => {
    const deactivationDate = new Date()

    contestService
      .desactivate(selectedContestId)
      .then(() => {
        const updatedContests = contests.map((contest) => {
          if (contest._id === selectedContestId) {
            return { ...contest, isDeleted: deactivationDate }
          }
          return contest
        })
        setContests(updatedContests)
        toast.success('Concurso inhabilitado')
      })
      .catch((error) => {
        console.error('Error al desactivar el concurso', error)
        toast.error('Error al desactivar el concurso')
      })
      .finally(() => {
        closeDeleteModal()
      })
  }

  const openDeleteModal = (contestId) => {
    setSelectedContestId(contestId)
    setOpenModal(true)
  }

  const closeDeleteModal = () => {
    setSelectedContestId(null)
    setOpenModal(false)
  }

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ marginTop: '40px', marginBottom: '40px' }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" component="h4">
          Lista de Concursos
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Stack direction="row" alignItems="center">
            <TextField
              label="Buscar concursos"
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
            to="/createcontest"
            startIcon={<AccountBoxIcon />}
            sx={{ backgroundColor: '#616A6B' }}
          >
            Añadir concurso
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
        {filteredContests.map((contest) => (
          <Stack
            key={contest._id}
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
            <Typography variant="body1">Concurso: {contest.name}</Typography>
            {contest.isDeleted ? (
              <TextField
                variant="outlined"
                size="medium"
                value="Desactivado"
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  backgroundColor: '#F0F0F0',
                  width: '125px',
                }}
              />
            ) : (
              <Stack direction="row" spacing={1}>
                {' '}
                <Button
                  variant="contained"
                  color="success"
                  component={Link}
                  to={`/admindesigns/${contest._id}`}
                  sx={{ fontSize: '0.8rem' }}
                >
                  Ver diseños
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/editcontest/${contest._id}`}
                  startIcon={<AccountBoxIcon />}
                  sx={{ fontSize: '0.8rem', backgroundColor: '#34495E' }}
                >
                  Editar concurso
                </Button>
                <IconButton
                  color="error"
                  aria-label="delete"
                  sx={{ fontSize: '1rem' }}
                  onClick={() => suspendContest(contest._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            )}
          </Stack>
        ))}
        <Dialog open={openModal} onClose={closeDeleteModal}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas eliminar este concurso?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteModal}>Cancelar</Button>
            <Button onClick={confirmSuspendContest} color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  )
}

export default AdminContestPage
