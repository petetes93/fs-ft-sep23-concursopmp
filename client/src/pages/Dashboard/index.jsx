import React from "react";
import { Container, Stack, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Container component="main" maxWidth="md">
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" component="h4">
          Seleccione una opción:
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: "300px", height: "100px" }}
            component={Link}
            to="/usuarios"
          >
            Usuarios
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: "300px", height: "100px" }}
            component={Link}
            to="/concursos"
          >
            Concursos
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Dashboard;
