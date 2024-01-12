import { NavLink } from "react-router-dom";
import { Typography, Grid } from "@mui/material";

function Brand() {
  return (
    <>
      <Grid
        item
        xs={12}
        md={2}
        sx={{
          textAlign: "center",
          display: { xs: "block", md: "block" },
          maxWidth: "100%", // Ensure the container doesn't exceed the viewport width
          margin: "0 auto", // Center the container horizontally
        }}
      >
        <a href="https://www.pampling.com/">
          <img
            src="https://www.pampling.com//img/newfront/logo-21-es-png@2x.svg"
            alt="Pampling Logo"
            className="black-logo"
            style={{ maxWidth: "100%", height: "100%" }}
          />
        </a>
      </Grid>
      {/* <Typography
        variant="h6"
        noWrap
        component={NavLink}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "poppins",
          fontWeight: 700,
          letterSpacing: ".1rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Pampling
      </Typography> */}
    </>
  );
}
export default Brand;
