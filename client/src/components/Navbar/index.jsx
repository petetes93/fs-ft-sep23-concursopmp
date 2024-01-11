import { useState, useEffect } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Avatar,
  Button,
  Tooltip,
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

  const optionsMainMenu = [{ label: "Contests", to: "/customers" }];

  const pages = ["Shop", "Liquidacion", "diseñadores", "Comunidad", "Tiendas"];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",

        boxShadow: "none",

        margin: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Brand />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: 20,
            }}
          >
            {pages.map((page) => (
              <Button
                href="https://www.pampling.com/tienda/catalogo/busqueda"
                key={page}
                onClick={handleOpenNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontFamily: "helvetica",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ pr: 47 }}>
            <Button sx={{ color: "black", fontFamily: "helvetica" }}>
              Contest
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonRoundedIcon
                  sx={{
                    display: { xs: "none", md: "flex" },
                    mr: 1,
                    fontSize: 40,
                    color: "black",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
