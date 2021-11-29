import React, { useState, useEffect, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./styles/ScreensStyles.css";
import axios from "axios";

const Modal = lazy(() => import("../components/Modal"));

const ProductItem = lazy(() => import("../components/ProductItem"));

const Products = () => {
  const [productsData, setProductsData] = useState([]);

  const [creationFormIsOpen, setCreationFormModalOpen] = useState(false);

  function openCreationFormModal() {
    setCreationFormModalOpen(true);
  }

  function closeCreationFormModal() {
    setCreationFormModalOpen(false);
  }

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
  });

  const goToSaleResume = () => {
    if (storage.getItem("shoppingCart")) {
      history.push("/sale-resume");
    } else if (!storage.getItem("shoppingCart")) {
      alert("La canasta está vacía, añade unos productos para verla.");
    }
  };

  const addToShopingCart = (product) => {
    if (storage.getItem("shoppingCart")) {
      let currentShoppingCart = JSON.parse(storage.getItem("shoppingCart"));
      currentShoppingCart.saleData.push(product);
      storage.setItem("shoppingCart", JSON.stringify(currentShoppingCart));
    } else if (!storage.getItem("shoppingCart")) {
      storage.setItem("shoppingCart", JSON.stringify({ saleData: [product] }));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <span className="products-title">Productos</span>
        <div className="product-buttons-container">
          <button
            type="button"
            onClick={openCreationFormModal}
            className="btn btn-primary create-product-button"
          >
            Añadir nuevo producto
          </button>
          <Suspense
            fallback={
              <img src={logo} className="App-logo" alt="" width="100px" />
            }
          >
            <Modal
              handleClose={closeCreationFormModal}
              show={creationFormIsOpen}
              child="CreateProduct"
            />
          </Suspense>
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
            return null;
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default Products;
