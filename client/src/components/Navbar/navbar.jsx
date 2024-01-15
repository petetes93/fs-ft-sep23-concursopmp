import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import "./styles.css";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";

const pages = ["Features", "Pricing", "Resources"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [displayed, setDisplayed] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        pt: 5,
        boxShadow: "none",
        width: "70%",
        margin: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            component="a"
            sx={{
              mr: 2,
              fontFamily: "Poppins",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
            }}
          >
            Pampling
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              ml: "50%",
              display: { xs: "flex", md: "flex", lg: "flex", xl: "none" },
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
                display: { xs: "flex", md: "flex", lg: "flex", xl: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  sx={{
                    backgroundColor: "#3a3054",
                    "&:hover": {
                      background: "#3a3054",
                      boxShadow: "none",
                    },
                  }}
                  className="blockMenu"
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography
                    width="100%"
                    align="center"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem
                sx={{
                  borderTop: "1px solid black",
                  backgroundColor: "#3a3054",
                  "&:hover": {
                    background: "#3a3054",
                    boxShadow: "none",
                  },
                }}
              ></MenuItem>

              <MenuItem
                sx={{
                  backgroundColor: "#3a3054",
                  "&:hover": {
                    background: "#3a3054",
                    boxShadow: "none",
                  },
                }}
                className="blockMenu"
                onClick={handleCloseNavMenu}
              >
                <Typography
                  width="100%"
                  align="center"
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  LogIn
                </Typography>
              </MenuItem>

              <MenuItem
                sx={{
                  backgroundColor: "#3a3054",
                  "&:hover": {
                    background: "#3a3054",
                    boxShadow: "none",
                  },
                }}
                className="blockMenu"
                onClick={handleCloseNavMenu}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2BD0D0",
                    "&:hover": {
                      background: "#bff0f0",
                      boxShadow: "none",
                    },
                    borderRadius: "30px",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    boxShadow: "none",
                    width: "15rem",
                    margin: "auto",
                  }}
                >
                  Sign Up
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "none", lg: "none", xl: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  mr: 5,

                  my: 2,

                  fontFamily: "Poppins",

                  color: "grey",

                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "none", lg: "none", xl: "flex" },
              justifyContent: "space-evenly",
            }}
          >
            <Button
              sx={{
                color: "gray",

                "&:hover": {
                  color: "black",
                },

                fontFamily: "Poppins",
              }}
            >
              Log In
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2BD0D0",

                "&:hover": {
                  background: "#bff0f0",

                  boxShadow: "none",
                },

                borderRadius: "30px",

                mt: 1,

                fontFamily: "Poppins",

                fontWeight: "bold",

                boxShadow: "none",

                height: 50,
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

