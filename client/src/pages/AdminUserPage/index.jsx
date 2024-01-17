import React, { useState, useEffect } from "react";
import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";
import RestoreIcon from "@mui/icons-material/Restore";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";
import { Link } from "react-router-dom";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const makeAdmin = (userID) => {
    axios
      .put(`http://localhost:3000/api/user/${userID}`, { isAdmin: true })
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === userID ? { ...user, isAdmin: true } : user
          )
        );

        toast.success("Usuario convertido en administrador");
      })
      .catch((error) => {
        console.error("Error al convertir a usuario en administrador", error);
        toast.error("Error al convertir a usuario en administrador");
      });
  };

  const removeAdmin = (userID) => {
    axios
      .put(`http://localhost:3000/api/user/${userID}`, { isAdmin: false })
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === userID ? { ...user, isAdmin: false } : user
          )
        );

        toast.success("El usuario ya no es administrador");
      })
      .catch((error) => {
        console.error("Error al quitar privilegios de administrador", error);
        toast.error("Error al quitar privilegios de administrador");
      });
  };

  const toggleAccountStatus = (userID, isDeleted) => {
    const action = isDeleted ? activateAccount : suspendAccount;
    action(userID);
  };

  const suspendAccount = (userID) => {
    axios
      .put(`http://localhost:3000/api/user/delete/${userID}`)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === userID ? { ...user, isDeleted: new Date() } : user
          )
        );
        toast.success("Usuario desactivado correctamente");
      })
      .catch((error) => {
        console.error("Error al suspender la cuenta de usuario", error);
        toast.error("Error al desactivar al usuario");
      });
  };

  const activateAccount = (userID) => {
    axios
      .put(`http://localhost:3000/api/user/delete/${userID}`)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === userID ? { ...user, isDeleted: null } : user
          )
        );
        toast.success("Usuario activado con éxito");
      })
      .catch((error) => {
        console.error("Error al activar la cuenta de usuario", error);
        toast.error("Error al activar al usuario");
      });
  };

  const deleteUser = (userID) => {
    openDeleteModal(userID);
  };

  const confirmDeleteUser = () => {
    axios
      .delete(`http://localhost:3000/api/user/${selectedUserId}`)
      .then((response) => {
        setUsers(users.filter((user) => user._id !== selectedUserId));
        toast.success("Usuario eliminado correctamente");
      })
      .catch((error) => {
        console.error("Error al borrar definitivamente a un usuario", error);
      })
      .finally(() => {
        closeDeleteModal();
      });
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDeleteModal = (userID) => {
    setSelectedUserId(userID);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setOpenModal(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" component="h4">
          Lista de Usuarios
        </Typography>
        <Container
          component="div"
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Buscar usuarios"
            variant="outlined"
            size="medium"
            sx={{ width: "200px", marginRight: "20px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/admincontest"
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
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
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
                color={user.isDeleted ? "success" : "warning"}
                startIcon={user.isDeleted ? <RestoreIcon /> : <BlockIcon />}
                onClick={() => toggleAccountStatus(user._id, user.isDeleted)}
              >
                {user.isDeleted ? "Activar" : "Suspender"}
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
            <MuiButton onClick={confirmDeleteUser} color="error">
              Eliminar
            </MuiButton>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
};

export default AdminUserPage;
