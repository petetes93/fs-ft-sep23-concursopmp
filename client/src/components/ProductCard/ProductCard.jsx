import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function ProductCard() {
  return (
    <Card
      sx={{
        maxHeight: 600,
        maxWidth: 345,
        boxShadow: '0 10px 10px  rgba(0, 0, 0, 0.5)',
        backgroundColor: '#68A9AB',
      }}
    >
      <div>
        <CardMedia
          component="img"
          // alt={product.name}
          height="300"
          // image={product.imageURL}
          image="https://statics.pampling.com/imagenes/galerias/imagen_32117.jpg?1704817667"
        />
      </div>

      <CardContent
        sx={{
          //color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <div style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              sx={{
                fontSize: '30px',
                marginBottom: '15px',
              }}
            >
              Producto 1
            </Typography>
          </div>

          <Typography variant="body2" fontSize="25px" sx={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '6px' }}>
              5
            </span>

            <ThumbUpAltIcon />
          </Typography>
        </div>

        <Typography variant="body2" sx={{ fontSize: '14px', margin: '5px', fontFamily: 'Montserrat, sans-serif' }}>
          2024-01-09
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard;
