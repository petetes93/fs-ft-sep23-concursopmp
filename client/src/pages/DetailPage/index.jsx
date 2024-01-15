import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";

const DetailsPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mt: "6rem",
          width: "60%",
        }}
      >
        <CardContent>
          {/* Título del producto */}
          <Typography variant="h5">{Catalog.name}</Typography>

          {/* Imagen del producto */}
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <img
              src={Catalog.prototype}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>

          {/* Descripción del producto */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", ml: "50%" }}>
            <Typography variant="body1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
              voluptatem libero cumque a rem? Nam, ad? Repellat veniam nobis sit
              impedit nam officiis, numquam sapiente molestiae modi ratione iste
              vel.
            </Typography>
          </Box>
          {/* Botón para darle a me gusta */}
          {/* <Button variant="outlined" color="primary" onClick={handleLike}>
            {!faved ? <FavoriteBorder /> : <Favorite />}
          </Button> */}

          {/* Información del autor */}
          <div>
            <Typography variant="h6">Información del Autor</Typography>
            <Typography variant="body1">Nombre: name</Typography>
            <Typography variant="body1">Email: email</Typography>
            {/* Puedes agregar más información del autor según tus necesidades */}
          </div>
        </CardContent>
      </Card>
      <Card
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: "6rem",
          ml: "2rem",
          width: "30%",
        }}
      >
        <CardContent>
          <Box></Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsPage;
