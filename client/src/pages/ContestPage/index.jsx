import { useEffect, useState } from 'react'
import { Container, Grid, CircularProgress } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useContests } from 'hooks'
import Catalog from 'src/components/Catalog/Catalog'
import ContestCard from '../../components/ContestCard/ContestCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function ContestPage() {
  const { contests, loading } = useContests()

  if (loading) return <CircularProgress />

  console.log(contests)

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
          <CardMedia
            style={{
              /*filter: 'blur(3.5px)',*/ height: '300px',
              width: '100%',
            }}
            component="img"
            image="https://statics.pampling.com/imagenes/banners_new/imagen_banner_1.jpg"
          />

          <Container
            disableGutters
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '30px',
                marginTop: '-170px',
                marginBottom: '100px',
                zIndex: 1,
              }}
            >
              Descripcion
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
            <Select
              label="Estado"
              defaultValue="Activo"
              sx={{
                minWidth: '120px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  borderColor: 'none',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'none',
                },
              }}
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Finalizado">Finalizado</MenuItem>
            </Select>
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
          marginBottom: '100px',
        }}
      >
        {contests.map(contest => {
          console.log(contest)

          return <ContestCard key={contest._id} contest={contest} />
        })}
      </div>
    </>
  )
}

export default ContestPage
