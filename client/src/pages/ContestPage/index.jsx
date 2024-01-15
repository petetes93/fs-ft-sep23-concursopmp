import { useEffect, useState } from 'react'
import { Container, Grid, CircularProgress, TextField } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useContests } from 'hooks'
import Catalog from 'src/components/Catalog/Catalog'
import ContestCard from 'src/components/ContestCard/ContestCard'
import SearchBar from 'src/components/ContestCard/ContestCard'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function ContestPage() {
  const { contests, loading } = useContests()

  const [searchTerm, setSearchTerm] = useState('')

  if (loading) return <CircularProgress />

  const filteredContests = contests.filter(contest => {
    return (
      contest &&
      contest.theme &&
      contest.theme.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <>
      <Card
        sx={{
          maxHeight: '400px',
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
              /*filter: 'blur(3.5px)',*/ height: '500px',
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
                marginTop: '-325px',
                marginBottom: '100px',
                zIndex: 1,
                textAlign: 'center',

              }}
            >
              "Explora y vota en emocionantes sorteos temáticos mientras descubres creativos diseños. ¡Participa en la diversión y elige tus favoritos para tener la oportunidad de ganar premios increíbles!"
            </Typography>
          </Container>
        </div>
      </Card>

      <Container disableGutters sx={{ marginTop: '50px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Buscar temática"
              variant="outlined"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              sx={{
                '& input': {
                  color: 'black',
                  height: '100%',
                },
                '& fieldset': {
                  border: 'none',
                },
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                outline: 'none',
                width: '700px',
                height: '40px',
                lineHeight: '60px',
                display: 'flex',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                },
              }}
            />
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
          display: 'grid',
          flexDirection: 'column',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '40px',
          marginLeft:'20px',
          marginRight:'20px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
          marginBottom: '100px',
        }}
      >
        {filteredContests.map(contest => {
          return <ContestCard key={contest._id} contest={contest} />
        })}
      </div>
    </>
  )
}

export default ContestPage
