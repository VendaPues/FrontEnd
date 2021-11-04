import React, { useState, useCallback } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';



const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MTU3ODQ1YjI0MWVkMDY2ZWNhNGI4NTEiLCJ2ZW5kYXB1ZXMtcm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2MzU4NzE2MjAsImV4cCI6MTYzNTk1ODAyMH0.swvLWU_ZiHEUcu8qt3nN_fSWUfX-lg-zjJrtqeZKp8o';
const BASE_URL  = "http:/localhost:8081/product";

axios.interceptors.request.use(
  config =>{
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },

  error =>{
    return Promise.reject(error);
  }
);

const authAxios = axios.create({
     baseURL: BASE_URL,
     headers:{
         Authorization: `Bearer ${accessToken}`
     }
 });

export function Products  ()  {

  const[image, setImage] = useState("");
  const[productName, setProductName] = useState("");
  const[price, setPrice] = useState("");
  const[salesPrice, setSalesPrice] = useState("");
  const[details, setDetails] = useState("");
  const [products, setProducts] = useState([]); 
  const [requestError, setRequestError] = useState();
    

    return (

      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          //imagen 
          image="/"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          productName
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Precio de compra: price
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Precio de venta: salesPrice
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Utilidad: price-salesPrice
          </Typography>
          <Typography variant="body2" color="text.secondary">
            details
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
        

    );

}