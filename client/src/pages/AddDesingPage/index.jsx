import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Paper, Divider } from "@mui/material";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const AddDesingPage = () => {
  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }} maxWidth="sm">
      <Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Typography variant="h4" style={{ marginBottom: '10px' }}>
          Añadir diseño
        </Typography>

        <Divider
        style={{
          marginBottom: '25px',
          width: '100%',
          backgroundColor:'grey',
          opacity:'0.5'
        }}
        />


        <div style={{ width: '300px', marginBottom: '20px' }}>
          <Typography variant="body1">
            Nombre
          </Typography>
          <TextField
            label="Escribe aquí"
            variant="outlined"
            fullWidth
            sx={{
              marginTop:'10px',
              '& legend': { display: 'none' },
              '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.1s ease-in" }
            }}
          />
        </div>

        <div style={{ width: '300px', marginBottom: '20px' }}>
          <Typography variant="body1">
            Descripción
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            label="Escribe aquí"
            multiline
            maxRows={6}
            variant="outlined"
            fullWidth
            sx={{
              marginTop:'10px',
              '& legend': { display: 'none' },
              '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.1s ease-in" }
            }}
          />
        </div>

        <div style={{ width: '300px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1">
            Imagen
          </Typography>
          <Button variant="outlined" color="primary" style={{ marginTop: '10px' }}>
            <AddPhotoAlternateIcon style={{ fontSize: 48 }} />
          </Button>
        </div>

        <Link to = {"/product"}>
          <Button variant="contained" color="primary" style={{ marginTop: '20px', alignSelf: 'center' }}>
            Subir
          </Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default AddDesingPage;
