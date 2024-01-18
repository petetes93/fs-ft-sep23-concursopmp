import React, { useState, useEffect } from 'react'
import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import BlockIcon from '@mui/icons-material/Block'
import RestoreIcon from '@mui/icons-material/Restore'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from '@mui/material'
import { useUsers } from 'hooks'
import userService from '../../services/user-service'
import { Link } from 'react-router-dom'

const AdminUserPage = () => {
  const { users, loading, setUsers } = useUsers()
  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  if (loading) return <CircularProgress />

  const makeAdmin = (userId) => {
    userService
      .update(userId)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isAdmin: true } : user
          )
        )

        toast.success('Usuario convertido en administrador')
      })
      .catch((error) => {
        console.error('Error al convertir a usuario en administrador', error)
        toast.error('Error al convertir a usuario en administrador')
      })
  }

  const removeAdmin = (userId) => {
    userService
      .update(userId)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isAdmin: false } : user
          )
        )

        toast.success('El usuario ya no es administrador')
      })
      .catch((error) => {
        console.error('Error al quitar privilegios de administrador', error)
        toast.error('Error al quitar privilegios de administrador')
      })
  }

  const toggleAccountStatus = (userID, isDeleted) => {
    const action = isDeleted ? activateAccount : suspendAccount
    action(userID)
  }

  const suspendAccount = (userId) => {
    userService
      .banUser(userId)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isDeleted: new Date() } : user
          )
        )
        toast.success('Usuario desactivado correctamente')
      })
      .catch((error) => {
        console.error('Error al suspender la cuenta de usuario', error)
        toast.error('Error al desactivar al usuario')
      })
  }

  const activateAccount = (userId) => {
    userService
      .banUser(userId)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isDeleted: null } : user
          )
        )
        toast.success('Usuario activado con éxito')
      })
      .catch((error) => {
        console.error('Error al activar la cuenta de usuario', error)
        toast.error('Error al activar al usuario')
      })
  }

  const deleteUser = (userId) => {
    openDeleteModal(userId)
  }

  const confirmDeleteUser = (userId) => {
    userService
      .delete(userId)
      .then((response) => {
        setUsers(users.filter((user) => user._id !== selectedUserId))
        toast.success('Usuario eliminado correctamente')
      })
      .catch((error) => {
        console.error('Error al borrar definitivamente a un usuario', error)
      })
      .finally(() => {
        closeDeleteModal()
      })
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId)
    setOpenModal(true)
  }

  const closeDeleteModal = (userId) => {
    setSelectedUserId(null)
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
          Lista de Usuarios
        </Typography>
        <Container
          component="div"
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            label="Buscar usuarios"
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
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/admincontest"
            sx={{ backgroundColor: '#D7DBDD' }}
          >
            Ir a Concursos
          </Button>
        </Container>
        {filteredUsers.map((user) => (
          <Stack
            key={user._id}
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
            <Typography variant="body1">
              Nombre de Usuario: {user.username}
            </Typography>
            <Stack direction="row" spacing={1}>
              {user.isAdmin ? (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={() => removeAdmin(user._id)}
                  >
                    Quitar Admin
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => makeAdmin(user._id)}
                  >
                    Hacer Admin
                  </Button>
                </>
              )}
              <Button
                variant="contained"
                color={user.isDeleted ? 'success' : 'warning'}
                startIcon={user.isDeleted ? <RestoreIcon /> : <BlockIcon />}
                onClick={() => toggleAccountStatus(user._id, user.isDeleted)}
              >
                {user.isDeleted ? 'Activar' : 'Suspender'}
              </Button>
              <IconButton
                color="error"
                aria-label="delete"
                onClick={() => deleteUser(user._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        ))}
        <Dialog open={openModal} onClose={closeDeleteModal}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas eliminar este usuario?
            </Typography>
          </DialogContent>
          <DialogActions>
            <MuiButton onClick={closeDeleteModal}>Cancelar</MuiButton>
            <MuiButton
              onClick={() => confirmDeleteUser(selectedUserId)}
              color="error"
            >
              Eliminar
            </MuiButton>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  )
}

export default AdminUserPage
