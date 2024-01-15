import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";

import { useDesign } from "hooks";

import designService from "../../services/design-service";
import commentService from "../../services/comment-service";

const DetailsPage = () => {
  // const [newComment, setNewComment] = useState("");

  // const { design, loading, setDesign } = useDesign();

  // const handleCommentChange = (event) => {
  //   setNewComment(event.target.value);
  // };

  // const handleAddComment = async () => {
  //   try {
  //     await commentService.create({ comment: newComment }).then((res) => {
  //       console.log("creado", res.data);
  //       setDesign({ ...design, comments: [...design.comments, res.data] });
  //     });
  //     setNewComment("");
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  return (
    <div>
      <Card
        sx={{
          mt: "6rem",
          width: "60%",
          ml: "20%",
        }}
      >
        <CardContent>
          {/* Título del producto */}
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: "3rem",
            }}
          >
            {Catalog.name}
          </Typography>
          <Divider
            style={{
              marginBottom: "25px",
              width: "80%",
              margin: "0 auto",
              backgroundColor: "grey",
              opacity: "0.5",
            }}
          />
          {/* Imagen del producto */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-start", mt: "3rem" }}
          >
            <img src={Catalog.name} style={{ width: "100%", height: "auto" }} />
          </Box>

          {/* Descripción del producto */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", ml: "50%" }}>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. A,
              recusandae maiores! Ipsa perferendis assumenda porro repudiandae
              id molestias itaque officia iste possimus quo vitae beatae ut,
              fugiat tempora consequatur odit.
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Nuevo comentario"
              multiline
              rows={3}
              sx={{ width: "60%", mt: "2rem" }}
              // value={newComment}
              // onChange={handleCommentChange}
            />
            <Button
              sx={{ width: "20%", mt: "2rem" }}
              variant="contained"
              color="primary"
              // onClick={handleAddComment}
            >
              Agregar Comentario
            </Button>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <Typography variant="h6">Comentarios</Typography>

            {/* <div>
                {place.comments.map((comment, index) => (
                  <Typography key={index} variant="body2">
                    {comment.comment}
                  </Typography>
                ))}
              </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsPage;
