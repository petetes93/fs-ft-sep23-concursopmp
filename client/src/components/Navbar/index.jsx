import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Typography,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from '@mui/material'

// import { Menu, CollapseMenu } from "../../components";

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import MenuIcon from '@mui/icons-material/Menu'

import Brand from './Brand'

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const optionsMainMenu = [{ label: 'Contests', to: '/customers' }]

  const pages = ['Shop', 'Liquidacion', 'diseñadores', 'Comunidad', 'Tiendas']

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'white',

        boxShadow: 'none',

        margin: 'auto',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Brand />
          {/* <Box>
            <Button
              sx={{
                fontFamily: "helvetica",
                color: "grey",

                "&:hover": {
                  color: "black",
                },
              }}
            >
              Concursos
            </Button>
            asasaq
          </Box> */}
          <Box
            sx={{
              flexGrow: 1,
              ml: '50%',
              display: { xs: 'flex', md: 'flex', lg: 'flex', xl: 'none' },
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='black'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'flex', lg: 'flex', xl: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  sx={{
                    backgroundColor: 'white',
                  }}
                  className='blockMenu'
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography
                    width='100%'
                    align='center'
                    sx={{
                      fontFamily: 'helvetica',
                      fontWeight: 700,
                      color: 'gray',
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem
                sx={{
                  borderTop: '1px solid black',

                  backgroundColor: 'white',
                  '&:hover': {
                    background: '#3a3054',

                    boxShadow: 'none',
                  },
                }}
              ></MenuItem>

              <MenuItem
                sx={{
                  backgroundColor: 'white',
                }}
                className='blockMenu'
                onClick={handleCloseNavMenu}
              >
                <Typography
                  width='100%'
                  align='center'
                  sx={{
                    fontFamily: 'helvetica',
                    fontWeight: 700,
                    color: 'gray',
                  }}
                >
                  Concursos
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{
                  backgroundColor: 'white',
                }}
                className='blockMenu'
                onClick={handleCloseNavMenu}
              >
                <Button
                  color='secondary'
                  sx={{
                    backgroundColor: 'transparent',

                    fontWeight: 'bold',
                    boxShadow: 'none',
                    width: '15rem',
                    margin: 'auto',
                  }}
                >
                  <PersonRoundedIcon fontSize='large' sx={{ color: 'black' }} />
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' },
            }}
          >
            <Button
              sx={{
                fontFamily: 'helvetica',
                color: 'grey',

                '&:hover': {
                  color: 'black',
                },
              }}
            >
              Concursos
            </Button>

            {pages.map((page) => (
              <Link to='https://www.pampling.com/tienda/catalogo/busqueda'>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    mr: 2,

                    my: 2,

                    fontFamily: 'helvetica',

                    color: 'grey',

                    '&:hover': {
                      color: 'black',
                    },
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'none', lg: 'none', xl: 'flex' },
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              variant='outlined'
              sx={{
                backgroundColor: 'transparent',

                borderRadius: '50px',

                boxShadow: 'none',

                height: 50,
              }}
            >
              <PersonRoundedIcon fontSize='large' />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
