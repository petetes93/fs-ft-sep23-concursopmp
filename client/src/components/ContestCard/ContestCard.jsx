import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

function ContestCard({ contest }) {
  const { name, image, _id } = contest
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
        <Link to={`/contest/${_id}`}>
          <CardMedia component="img" height="300" image={image} />
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
        <Link to={`/contest/${_id}`}>
          <Typography
            sx={{
              fontSize: '30px',
              textAlign: 'center',
            }}
          >
            {name}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}

export default ContestCard
