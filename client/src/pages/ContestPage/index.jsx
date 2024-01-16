import { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
} from '@mui/material'
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
  const [filterStatus, setFilterStatus] = useState('')

  if (loading) return <CircularProgress />

  const filteredContests = contests.filter(contest => {
    return (
      (!searchTerm ||
        contest.theme.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterStatus ||
        (filterStatus === '' && contest.isActive) ||
        (contest.isActive && filterStatus === 'Activo') ||
        (!contest.isActive && filterStatus === 'Finalizado'))
    )
  })

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
              height: '300px',
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
            <TextField
              label="Buscar temática"
              autoComplete="off"
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
            <FormControl>
              <InputLabel>Estado</InputLabel>
              <Select
                label="Estado"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
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
                {' '}
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Finalizado">Finalizado</MenuItem>
              </Select>
            </FormControl>
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
        {filteredContests.map(contest => {
          return <ContestCard key={contest._id} contest={contest} />
        })}
      </div>
    </>
  )
}

export default ContestPage
