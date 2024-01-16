import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
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
      <div>
        <Link to={`/design/${_id}`}>
          <CardMedia component="img" alt={title} height="300" image={image} />
        </Link>
      </div>

      <CardContent
        sx={{
          //color: 'white',
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Link to={`/design/${_id}`}>
          <div>
            <div style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                sx={{
                  fontSize: "30px",
                  marginBottom: "15px",
                }}
              >
                {title}
              </Typography>
            </div>

            <Typography
              variant="body2"
              fontSize="25px"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "6px" }}>{voteRegister.length}</span>

              <ThumbUpAltIcon />
            </Typography>
          </div>
        </Link>

        {/*   <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            margin: '5px',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          2024-01-09
        </Typography> */}
      </CardContent>

      <Divider
        style={{
          backgroundColor: 'black',
          opacity: '0.2',
          width: '90%',
          marginLeft: '15px',
        }}
      />
      <div>
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            marginBottom: "10px",
            fontFamily: "Montserrat, sans-serif",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {author.username}
        </Typography>
      </div>
    </Card>
  );
}

export default ProductCard;
