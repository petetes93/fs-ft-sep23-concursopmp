import React from "react";
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
import BlockIcon from "@mui/icons-material/Block";

function AdminUserPage() {
  return (
    <Container component="main" maxWidth="md">
      <Stack spacing={3} alignItems="center">
        <TextField
          label="Buscar usuarios"
          variant="outlined"
          size="medium"
          sx={{ width: "200px", marginRight: "20px" }}
        />
        <Typography variant="h4" component="h4">
          Lista de Usuarios
        </Typography>
        {/* Mapea tus datos de usuarios aquí */}
        {/* Ejemplo con datos de usuario ficticios */}
        {[...Array(5)].map((_, index) => (
          <Stack
            key={index}
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
              Nombre de Usuario {index + 1}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AccountBoxIcon />}
              >
                Admin
              </Button>
              <Button
                variant="contained"
                color="warning"
                startIcon={<BlockIcon />}
              >
                Suspender
              </Button>
              <IconButton color="error" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}

export default AdminUserPage;
