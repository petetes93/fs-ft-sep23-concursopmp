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
    {/* <Container>
        <img style={{ width: '100%', height: '500px', marginTop:'100px', marginBottom:'100px' }}
          src="https://statics.pampling.com/imagenes/banners_new/imagen_banner_1.jpg"
          alt="Imagen de fondo"
        />
        
        <Container style={{ textAlign: 'center', color: 'red', marginTop:'-200px' }}>
          <h1>PAGINA PARA EL CONCURSO</h1>
        </Container>
      </Container>
          
      

      <div style={{ marginTop: '100px', marginBottom: '100px' }}>
        <ProductCard />
       <Catalog /> 
      </div>
       */}

      <Card
            sx={{
              maxHeight: '300px',
              maxWidth: '100%',
              boxShadow: '0 5px 5px  rgba(0, 0, 0, 0.5)',
              backgroundColor: '#68A9AB',
              marginTop:'50px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div>
              <CardMedia style={{ filter: 'blur(3.5px)' }}
                component="img"
                // alt={product.name}
                height="300"
                // image={product.imageURL}
                image="https://statics.pampling.com/imagenes/banners_new/imagen_banner_1.jpg"
              />
                <Container 
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
              <ContestCard/>
            </div>
    </>
  );
}

export default ContestPage;
