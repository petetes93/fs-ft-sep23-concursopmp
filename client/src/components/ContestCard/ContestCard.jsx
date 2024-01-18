import React from 'react';
import { Container, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ContestCard({ contest }) {
  const { name, image, _id, theme } = contest;


  const truncatedName = name.length > 13 ? `${name.slice(0, 40)}...` : name;

  return (
    <Card
      sx={{
        height: 400,
        width: 345,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        backgroundColor: '#FDFDFD',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Link to={`/contest/${_id}`}>
        <Container disableGutters sx={{width:'100%', height:'50%'}}>
          <CardMedia 
            component="img"
            height="200" 
            image={image}
            sx={{ width: '100%'}}
          />
        </Container>
      </Link>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          height:'50%'
        }}
      >
        <Link to={`/contest/${_id}`}>
          <Typography
            sx={{
              fontSize: '30px',
              textAlign: 'center',
              color:'black',
              fontWeight: '500'
            }}
          >
            {name}
          </Typography>
        </Link>
      </CardContent>

      <Divider
        style={{
          backgroundColor: 'black',
          opacity: '0.2',
          width: '90%',
          marginLeft: '15px',
          marginTop: '15px',
        }}
      />

      <div>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            marginBottom: '10px',
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center',
            marginTop: "10px",
          }}
        >
          {theme}
        </Typography>
      </div>
    </Card>
  );
}

export default ContestCard;