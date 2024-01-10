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

import { useAuth } from "hooks";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MenuIcon from "@mui/icons-material/Menu";

import { stringAvatar } from "./helpers";

import Brand from "./Brand";
import { Menu, CollapseMenu } from "../../components";
function Navbar() {
  const [user] = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [places, setPlaces] = useState([]);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  useEffect(() => {
    const getPlacesFromApi = async () => {
      try {
        const response = await fetch("http://localhost:4040/api/places");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error getting places from API:", error);
      }
    };

    getPlacesFromApi();
  }, []);

  const optionsMainMenu = [{ label: "Contests", to: "/customers" }];
  const optionsUserMenu = user.auth
    ? [{ label: "Logout", to: "/logout" }]
    : [
        { label: "Login", to: "/login" },
        { label: "Regiter", to: "/register" },
      ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "gray",

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

            <CollapseMenu
              anchor={anchorElNav}
              onClose={() => setAnchorElNav(null)}
              options={optionsMainMenu}
            />
          </Box>

          <Menu
            options={optionsMainMenu}
            onClose={() => setAnchorElNav(null)}
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonRoundedIcon
                  sx={{
                    display: { xs: "none", md: "flex" },
                    mr: 1,
                    fontSize: 40,
                    color: "white",
                  }}
                />
              </IconButton>
            </Tooltip>
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
