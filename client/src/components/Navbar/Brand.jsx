import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

function Brand() {
  return (
    <>
      <Typography
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
      </Typography>
    </>
  );
}
export default Brand;
