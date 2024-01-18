import { useState } from "react";
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
} from "@mui/material";

import { CollapseMenu } from "../../components";
import { useAuth } from "hooks";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MenuIcon from "@mui/icons-material/Menu";

import Brand from "./Brand";

function Navbar() {
  const [user] = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleOpenUserResponsive = (event) =>
    setIsLoggedIn(event.currentTarget);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = ["Shop", "Liquidacion", "diseñadores", "Comunidad", "Tiendas"];

  const optionsUserMenu = user.auth
    ? [{ label: "Logout", to: "/logout" }]
    : [
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#F7F7F8",

        boxShadow: "none",

        margin: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Brand />

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
                        fontWeight: 500,
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
                      fontWeight: 500,
                      color: "gray",
                      alignContent: "center",
                      pl: 11,
                      mr: 10,
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className="blockMenu"
                onClick={handleCloseNavMenu}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "none" },
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {!isLoggedIn && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Link
                        to="/login"
                        style={{
                          fontFamily: "helvetica",
                          fontWeight: 900,
                          color: "gray",
                        }}
                      >
                        <Button
                          variant="secondary"
                          sx={{
                            borderRadius: "50px",
                            boxShadow: "none",
                            height: 50,
                          }}
                          onClick={handleOpenUserResponsive}
                        >
                          Login
                        </Button>
                      </Link>
                      <Link
                        to="/register"
                        style={{
                          fontFamily: "helvetica",
                          fontWeight: 700,
                          color: "gray",
                        }}
                      >
                        <Button
                          variant="secondary"
                          sx={{
                            borderRadius: "50px",
                            boxShadow: "none",
                            height: 50,
                          }}
                          onClick={handleOpenUserResponsive}
                        >
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}

                  {isLoggedIn && (
                    <Link
                      to="/logout"
                      style={{
                        fontFamily: "helvetica",
                        fontWeight: 700,
                        color: "gray",
                      }}
                    >
                      <Button
                        variant="secondary"
                        sx={{
                          borderRadius: "50px",
                          boxShadow: "none",
                          height: 50,
                          ml: 10,
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Link>
                  )}
                </Box>
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
            <span
              style={{
                marginRight: "10px",
                marginTop: "0.5rem",
                color: "black",
              }}
            >
              {user.username ? `Hola, ${user.username}` : null}
            </span>
            <Button
              variant="secondary"
              sx={{
                borderRadius: "50px",
                boxShadow: "none",
                height: 50,
              }}
              onClick={handleOpenUserMenu}
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

            <CollapseMenu
              anchor={anchorElUser}
              onClose={() => setAnchorElUser(null)}
              options={optionsUserMenu}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
