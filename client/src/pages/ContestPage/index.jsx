import { Container } from "@mui/material";
import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Catalog from "src/components/Catalog/Catalog";
import ContestCard from "../../components/ContestCard/ContestCard";

function ContestPage() {

  return (
    <>
      <Card
        sx={{
          maxHeight: '300px',
          width: '100%',  // Añadir esta línea para ocupar todo el ancho
          margin: 0,      // Añadir esta línea para eliminar márgenes
          boxShadow: '0 5px 5px  rgba(0, 0, 0, 0.5)',
          backgroundColor: '#68A9AB',
          marginTop: '70px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <CardMedia style={{ filter: 'blur(3.5px)' }}
            component="img"
            height="300"
            image="https://statics.pampling.com/imagenes/banners_new/imagen_banner_1.jpg"
          />
          <Container disableGutters
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100vh',
            }}>
            <Typography
              sx={{
                color: 'white',
                fontSize: '30px',
                marginTop: '-150px',
                marginBottom: '100px',
                zIndex: 1
              }}
            >
              Descripcion
            </Typography>
          </Container>
        </div>
      </Card>

      <div style={{ marginTop: '100px', marginBottom: '100px' }}>
        <ContestCard />
      </div>
    </>
  );
}

export default ContestPage;
