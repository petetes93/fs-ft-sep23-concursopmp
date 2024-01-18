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
import SearchIcon from '@mui/icons-material/Search'

function ContestPage() {
  const { contests, loading } = useContests()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  if (loading) return <CircularProgress />

  const visibleContests = contests.filter((contest) => !contest.isDeleted)

  const filteredContests = visibleContests.filter((contest) => {
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
              filter: 'blur(3.5px)',
              height: '500px',
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
                fontWeight: 600,
                marginTop: '-400px',
                marginBottom: '100px',
                zIndex: 1,
                textAlign: 'center',
                filter: 'drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.5))',
              }}
            >
              "Explora y vota en emocionantes sorteos temáticos mientras
              descubres creativos diseños. ¡Participa en la diversión y elige
              tus favoritos para tener la oportunidad de ganar premios
              increíbles!"
            </Typography>
          </Container>
        </div>
      </Card>

      <Container disableGutters sx={{ marginTop: '50px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '100px',
              }}
            >
              <TextField
                label="Buscar temática"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  '& label': {
                    marginTop: '-7px',
                  },
                  marginLeft: '10px',
                  '& input': {
                    color: 'black',
                    height: '10px',
                  },
                  '& fieldset': {
                    border: 'none',
                  },
                  '& legend': { display: 'none' },
                  '& .MuiInputLabel-shrink': {
                    opacity: 0,
                    transition: 'all 0.1s ease-in',
                  },
                  backgroundColor: '#FDFDFD',
                  borderRadius: '12px',
                  outline: 'none',
                  width: '700px',
                  height: '40px',
                  marginBottom: '',
                  boxShadow: 'inset 0 0 0 1px black',
                  '&:hover': {
                    boxShadow: 'inset 0 0 0 1.5px black',
                  },
                }}
              />
              <SearchIcon
                sx={{
                  fontSize: '25px',
                  color: 'black',
                  marginLeft: '-30px',
                  alignSelf: 'center',
                  paddingRight: '5px',
                  zIndex: 1,
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6} container justifyContent="flex-end">
            <FormControl>
              <InputLabel>Estado</InputLabel>
              <Select
                label="Estado"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{
                  marginRight: '80px',
                  minWidth: '130px',
                  backgroundColor: 'white',
                }}
              >
                {' '}
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Finalizado">Inactivos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(345px, 1fr))`,
          gap: '20px',
          marginLeft: '20px',
          alignItems: 'center',
        }}
      >
        {filteredContests.map((contest, index) => (
          <div key={contest._id}>
            <ContestCard contest={contest} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ContestPage
