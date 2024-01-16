import { useEffect, useState } from 'react'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Container,
  Grid,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material'
import Catalog from 'src/components/Catalog/Catalog'
import ProductCard from 'src/components/ProductCard/ProductCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useDesigns, useContest } from 'hooks'
import AddIcon from '@mui/icons-material/Add'

function ProductsPage() {
  const { contestId } = useParams()
  const { designs, loading } = useDesigns()
  const { contest, loadingContest } = useContest(contestId)
  const [searchAuthor, setSearchAuthor] = useState('')

  if (loading && loadingContest) return <CircularProgress />

  const matchedDesigns = designs.filter(design => design.contest === contestId)

  const filteredAuthor = matchedDesigns.filter(design => {
    return (
      design &&
      design.author.username &&
      design.author.username.toLowerCase().includes(searchAuthor.toLowerCase())
    )
  })

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
            image={contest.image}
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
              {contest.name}
            </Typography>
          </Container>
        </div>
      </Card>

      <Container disableGutters sx={{ marginTop: '50px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Buscar por autor"
              autoComplete="off"
              variant="outlined"
              value={searchAuthor}
              onChange={e => setSearchAuthor(e.target.value)}
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
            <Link to={'/product/add_desing'}>
              <Button
                aria-label="add"
                startIcon={<AddIcon />}
                sx={{
                  marginLeft: '15px',
                  marginTop: '10px',
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
          marginBottom: '100px',
        }}
      >
        {filteredAuthor.map(design => {
          return <ProductCard key={design._id} design={design} />
        })}
      </div>
    </>
  )
}

export default ProductsPage
