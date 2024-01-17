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
import SearchIcon from '@mui/icons-material/Search'


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
                filter: 'drop-shadow(0px 5px 5px rgba(0, 0, 0, 1))',
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Buscar autor"
              variant="outlined"
              value={searchAuthor}
              onChange={e => setSearchAuthor(e.target.value)}
              sx={{
                '& label': {
                  marginTop:'-7px'
                },
                  marginLeft:'10px',
                '& input': {
                  color: 'black',
                  height: '10px',
                },
                '& fieldset': {
                  border: 'none',
                },
                '& legend': { display: 'none' },
                '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.1s ease-in" },
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                outline: 'none',
                width: '700px',
                height: '40px',
                marginBottom: '',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  boxShadow: 'inset 0 0 0 2px white'
                },
              }}
            />
            <SearchIcon
              sx={{
                fontSize:'25px',
                color: 'black',
                marginLeft: '-30px',
                alignSelf: 'center',
                paddingRight: '5px',
              }}
            />
          </div>
          </Grid>

          <Grid item xs={6} container justifyContent="flex-end">
            <Link to={'/product/add_desing'}>
              <Button
                aria-label="add"
                startIcon={<AddIcon />}
                sx={{
                  marginLeft: '15px',
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '40px',
          marginTop: '50px',
          marginLeft: '20px',
          marginRight: '20px',
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
