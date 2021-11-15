import React, { useState, useEffect, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg"
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./styles/ScreensStyles.css";
import axios from "axios";

const ProductItem = lazy(() => import("../components/ProductItem"));

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  let history = useHistory();
  const storage = window.localStorage;

  useEffect(() => {
    let currentUser = JSON.parse(storage.getItem("user"));
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    axios
      .get(
        `https://venda-pues-products-api-2.herokuapp.com/v1/product/${currentUser.userId}`,
        config
      )
      .then((res) => {
        console.log(res);
        setProductsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToCreateProduct = () => {
    history.push("/create-product");
  };

  return (
    <div className="balanceContainer">
      <Navbar />
      <div>
        <span className="productsTitle">Productos</span>
        <div className="row productsSearchSection">
          <button type="button" onClick={goToCreateProduct} className="btn btn-primary col-3 createProductButton">
            Añadir nuevo producto
          </button>
        </div>
        <Suspense fallback={<img src={logo} className="App-logo" alt="" width="100px"/>}>
          {productsData.map((product) => {
            if (product) {
              return <ProductItem key={product.id} productItem={product} />;
            }
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default Products;
