import * as React from "react";
import { Link } from 'react-router-dom';
import { Container, Grid, Button } from "@mui/material";
import Catalog from "src/components/Catalog/Catalog"
import ProductCard from "src/components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function ProductsPage() {

  return (
    <>
      <Card
        sx={{
          maxHeight: '300px',
          maxWidth: '100%',
          margin: 0,
          boxShadow: '0 5px 5px  rgba(0, 0, 0, 0.5)',
          backgroundColor: '#68A9AB',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <CardMedia style={{ /*  filter: 'blur(1px)',*/ height:"300px", width:"100%" }} 
            component="img"
            image="https://www.pixground.com/wp-content/uploads/2023/10/Halloween-Spooky-Pumpkin-Forest-AI-Generated-4K-Wallpaper-jpg.webp"
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
                marginTop: '-170px',
                marginBottom: '100px',
                zIndex: 1,
              }}
            >
              CONCURSO 1
            </Typography>
          </Container>
        </div>
      </Card>

      <Container disableGutters sx={{ marginTop: '50px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SearchBar />
          </Grid>

          <Grid item xs={6} container justifyContent="flex-end">

            <Link to = {"/product/add_desing"}>
              <Button
                aria-label="add"
                startIcon={<AddIcon />}
                sx={{
                  marginLeft: '15px',
                  marginTop:'12px'
                }}
              >
                Añadir diseño
              </Button>
            </Link>

          </Grid>
        </Grid>
      </Container>


      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
          marginBottom: '100px'
        }}
      >
        <ProductCard />
      </div>
    </>
  )
}

export default ProductsPage;
