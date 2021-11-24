import React, { useState, useEffect, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./styles/ScreensStyles.css";
import axios from "axios";

const ProductItem = lazy(() => import("../components/ProductItem"));

const Products = () => {
  const [productsData, setProductsData] = useState([]);

  const [shoppingCart, setShoppingCart] = useState([]);

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
        setProductsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToCreateProduct = () => {
    history.push("/create-product");
  };

  const goToSaleResume = () => {
    storage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    history.push("/sale-resume");
  };

  const addToShopingCart = (product) => {
    const arr = shoppingCart;
    arr.push(product);
    setShoppingCart(arr);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <span className="products-title">Productos</span>
        <div className="new-product-section">
          <button
            type="button"
            onClick={goToCreateProduct}
            className="btn btn-primary create-product-button"
          >
            Añadir nuevo producto
          </button>
          <button
            type="button"
            onClick={goToSaleResume}
            className="btn btn-primary create-product-button"
          >
            Ver carrito
          </button>
        </div>
        <Suspense
          fallback={
            <img src={logo} className="App-logo" alt="" width="100px" />
          }
        >
          {productsData.map((product) => {
            if (product) {
              return (
                <ProductItem
                  key={product.id}
                  productItem={product}
                  shopingCartAction={addToShopingCart}
                />
              );
            }
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default Products;
