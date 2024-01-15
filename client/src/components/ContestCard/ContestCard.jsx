import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ContestCard() {
  return (
    <Card
      sx={{
        maxHeight: 600,
        maxWidth: 345,
        boxShadow: '0 10px 10px rgba(0, 0, 0, 0.5)',
        backgroundColor: '#68A9AB',
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center', 
      }}
    >
      <div>
      <Link to = {"/product"}>
        <CardMedia
          component="img"
          height="300"
          image="https://services.meteored.com/img/article/halloween-fiesta-origen-leyendas-1698230767203_1280.jpg"
        />
        </Link>
      </div>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Link to = {"/product"}>
        <Typography
          sx={{
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          Concurso 1
        </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

export default ContestCard;
