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

  const matchedDesigns = designs.filter(
    (design) =>
      design.contest === contestId &&
      design.approvalDate &&
      (!design.isDeleted || design.approvalDate > design.isDeleted)
  )
  console.log(contest)

  const filteredAuthor = matchedDesigns.filter((design) => {
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
                fontSize: '40px',
                fontWeight: 600,
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '100px',
              }}
            >
              <TextField
                label="Buscar autor"
                variant="outlined"
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
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
            <Button
              variant="contained"
              component={Link}
              to="/"
              sx={{ backgroundColor: '#D7DBDD', height: '29%', color: 'black' }}
            >
              Ir a Concursos
            </Button>
            <Link to={`/product/add_desing/${contestId}`}>
              <Button
                aria-label="add"
                startIcon={<AddIcon />}
                sx={{
                  marginLeft: '15px',
                  mr: '40px',
                  border: 'solid 1px',
                  backgroundColor: '#FDFDFD',
                  '&:hover': { backgroundColor: '#FDFDFD' },
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
          gridTemplateColumns: `repeat(auto-fill, minmax(345px, 1fr))`,
          gap: '20px',
          marginLeft: '20px',
          alignItems: 'center',
        }}
      >
        {filteredAuthor.length > 0 ? (
          filteredAuthor.map((design) => {
            return <ProductCard key={design._id} design={design} />
          })
        ) : (
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
            Sé tu el primero en publicar un diseño!
          </Typography>
        )}
      </div>
    </>
  )
}

export default ProductsPage
