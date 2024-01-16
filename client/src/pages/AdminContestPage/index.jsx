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

function AdminContestPage() {
  const [contests, setContests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}

export default AdminContestPage;
