import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const DetailsPage = () => {
  return (
    <div>
      {design && (
        <Card>
          <CardContent>
            {/* Título del producto */}
            <Typography variant="h5">{design.name}</Typography>

            {/* Imagen del producto */}
            <img
              src={design.imageUrl}
              alt={design.name}
              style={{ width: "100%", height: "auto" }}
            />

            {/* Descripción del producto */}
            <Typography variant="body1">{design.description}</Typography>

            {/* Botón para darle a me gusta */}
            <Button variant="outlined" color="primary" onClick={handleLike}>
              {!faved ? <FavoriteBorder /> : <Favorite />}
            </Button>

            {/* Sección de Comentarios */}
            <div>
              <Typography variant="h6">Comentarios</Typography>
            </div>

            {/* Información del autor */}
            <div>
              <Typography variant="h6">Información del Autor</Typography>
              <Typography variant="body1">
                Nombre: {design.author.name}
              </Typography>
              <Typography variant="body1">
                Email: {design.author.email}
              </Typography>
              {/* Puedes agregar más información del autor según tus necesidades */}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DetailsPage;
