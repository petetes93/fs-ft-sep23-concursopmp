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
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import contestService from "../../services/contest-service";
import { Link } from "react-router-dom";

function AdminContestPage() {
  const [contests, setContests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedContestId, setSelectedContestId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/contest")
      .then((response) => {
        setContests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contests:", error);
      });
  }, []);

  const filteredContests = contests.filter((contest) =>
    contest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const suspendContest = (contestId) => {
    openDeleteModal(contestId);
  };

  const confirmSuspendContest = () => {
    contestService
      .desactivate(selectedContestId)
      .then(() => toast.success("Concurso inhabilitado"))
      .catch((error) => {
        console.error("Error al desactivar el concurso", error);
        toast.error("Error al desactivar el concurso");
      })
      .finally(() => {
        closeDeleteModal();
      });
  };

  const openDeleteModal = (contestId) => {
    setSelectedContestId(contestId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedContestId(null);
    setOpenModal(false);
  };

  return (
    <Container component="main" maxWidth="md">
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
              sx={{ width: "200px", marginRight: "20px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AccountBoxIcon />}
            sx={{ backgroundColor: "#b05f5f" }}
          >
            Añadir concurso
          </Button>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/adminuser"
          >
            Ir a Usuarios
          </Button>
        </Stack>
        {/* Mapea tus datos de concursos filtrados aquí */}
        {filteredContests.map((contest) => (
          <Stack
            key={contest._id}
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
            <Typography variant="body1">Concurso: {contest.name}</Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AccountBoxIcon />}
                sx={{ fontSize: "0.8rem" }}
              >
                Editar concurso
              </Button>
              <IconButton
                color="error"
                aria-label="delete"
                sx={{ fontSize: "1rem" }}
                onClick={() => suspendContest(contest._id)}
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
  );
}

export default AdminContestPage;
