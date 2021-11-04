import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";

import image1 from "../img/logo192.png";

const cards = [
    {
      id: 1,
      image: image1,
      productName: "Empanadas",
      description: "Rellenas de Carne",
      price: "2.000"
    },
    {
      id: 2,
      image: image1,
      productName: "Arepas",
      description: "Arepas blancas",
      price: "2.500"
    },
    {
      id: 3,
      image: image1,
      productName: "Jugo",
      description: "Jugo Natural",
      price: "2.200"
    },
    {
        id: 4,
        image: image1,
        productName: "Gaseosa",
        description: "Gaseosa Postobon",
        price: "1.500"
    },
    {
        id: 5,
        image: image1,
        productName: "Pasteles",
        description: "Pasteles de pollo",
        price: "2.100"
    }
  ];


export function Orders  () {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-around" alignItems="center">
            {cards.map(({ productName, description, id, price, image }) => (
                <Grid item xs={4} key={id}>
                    <ProductCard productName={productName} description={description} price={price} image={image}/>
                </Grid>
            ))}
        </Grid>
    );

}