import React from "react";
import { Link } from "react-router-dom";
import { Divider, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

function ProductCard({ design }) {
  const { image, title, author, uploadDate, voteRegister, _id } = design;

  console.log(voteRegister);
  return (
    <Card
      sx={{
        maxHeight: 550,
        width: 345,
        boxShadow: '0 10px 10px  rgba(0, 0, 0, 0.5)',
        backgroundColor: '#68A9AB',
      }}
    >
        <Link to={`/design/${_id}`}>
        <Container disableGutters sx={{width:'100%'}}>
          <CardMedia 
            component="img"
            height="300" 
            image={image}
            sx={{ width: '100%'}}
          />
          </Container>
        </Link>

      <CardContent
        sx={{
          color: 'white',
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        
          <div>
          <Link to={`/design/${_id}`}>
            <div style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                sx={{
                  fontSize: "30px",
                  marginBottom: "20px",
                }}
              >
                {title}
              </Typography>
            </div>
          </Link>

            <Typography
              variant="body2"
              fontSize="25px"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "6px" }}>{voteRegister.length}</span>

              <ThumbUpAltIcon />
            </Typography>
          </div>
      </CardContent>

      <Divider
        style={{
          backgroundColor: 'black',
          opacity: '0.2',
          width: '90%',
          marginLeft: '15px',
          marginTop: '15px',
        }}
      />

      <div>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            marginBottom: '10px',
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center',
            marginTop: "10px",
          }}
        >
          {author.username}
        </Typography>
      </div>
    </Card>
  );
}

export default ProductCard;
