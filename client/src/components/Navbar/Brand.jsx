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
          display: { xs: "flex", md: "flex", lg: "flex", xl: "flex" },
          maxWidth: "100%", // Ensure the container doesn't exceed the viewport width
          margin: "0 auto", // Center the container horizontally
        }}
      >
        <a href="/">
          <img
            src="https://www.pampling.com//img/newfront/logo-21-es-png@2x.svg"
            alt="Pampling Logo"
            className="black-logo"
            style={{ maxWidth: "100%", height: "100%" }}
          />
        </a>
      </Grid>
    </>
  );
}
export default Brand;
