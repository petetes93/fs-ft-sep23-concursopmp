import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  Popover,
} from "@mui/material";

// import { Menu, CollapseMenu } from "../../components";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MenuIcon from "@mui/icons-material/Menu";

import Brand from "./Brand";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const pages = ["Shop", "Liquidacion", "diseñadores", "Comunidad", "Tiendas"];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",

        boxShadow: "none",

        margin: "auto",
      }}
    >
      <Container maxWidth="xl">
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
              ml: "50%",
              display: { xs: "flex", md: "none", lg: "none", xl: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "flex", md: "none", lg: "none", xl: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  sx={{
                    backgroundColor: "white",
                  }}
                  className="blockMenu"
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Link to="https://www.pampling.com/tienda/catalogo/busqueda">
                    <Typography
                      width="100%"
                      align="center"
                      sx={{
                        fontFamily: "helvetica",
                        fontWeight: 700,
                        color: "gray",
                        pl: 11,
                        alignItems: "center",
                      }}
                    >
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem
                sx={{
                  backgroundColor: "white",
                }}
                className="blockMenu"
                onClick={handleCloseNavMenu}
              >
                <Link to="/">
                  <Typography
                    width="100%"
                    sx={{
                      fontFamily: "helvetica",
                      fontWeight: 700,
                      color: "gray",
                      alignContent: "center",
                      pl: 11,
                    }}
                  >
                    Concursos
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem
                sx={{
                  borderTop: "1px solid black",

                  backgroundColor: "white",
                  "&:hover": {
                    background: "#3a3054",

                    boxShadow: "none",
                  },
                }}
              ></MenuItem>

              <MenuItem
                sx={{
                  backgroundColor: "white",
                }}
                className="blockMenu"
                onClick={handleCloseNavMenu}
              >
                <Link to="./login">
                  <Button
                    color="secondary"
                    sx={{
                      backgroundColor: "transparent",

                      fontWeight: "bold",
                      boxShadow: "none",
                      width: "15rem",
                      margin: "auto",
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem
                sx={{
                  backgroundColor: "white",
                }}
                className="blockMenu"
                onClick={handleCloseNavMenu}
              >
                <Link to="./register">
                  <Button
                    color="secondary"
                    sx={{
                      backgroundColor: "transparent",

                      fontWeight: "bold",
                      boxShadow: "none",
                      width: "15rem",
                      margin: "auto",
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
            }}
          >
            <Link to="./">
              <Button
                sx={{
                  ml: "5rem",
                  my: 2,
                  fontFamily: "helvetica",
                  color: "grey",

                  "&:hover": {
                    color: "#2bd0d0",
                  },
                }}
              >
                Concursos
              </Button>
            </Link>

            {pages.map((page) => (
              <Link to="https://www.pampling.com/tienda/catalogo/busqueda">
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    mr: 1,

                    my: 2,

                    fontFamily: "helvetica",

                    color: "grey",

                    "&:hover": {
                      color: "#2bd0d0",
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
              display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
            }}
          >
            <Button
              variant="secondary"
              sx={{
                borderRadius: "50px",

                boxShadow: "none",

                height: 50,
              }}
              onClick={handleClick}
            >
              <PersonRoundedIcon
                fontSize="large"
                sx={{
                  color: "black",
                  "&:hover": {
                    color: "#2bd0d0",
                  },
                }}
              />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <div>
                <Link to="./login">
                  <Button onClick={handleClose}>Login</Button>
                </Link>
              </div>
              <div>
                <Link to="./register">
                  <Button onClick={handleClose}>Register</Button>
                </Link>
              </div>
            </Popover>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
