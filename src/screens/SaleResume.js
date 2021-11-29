import React, { useState, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg";
import Navbar from "../components/Navbar";
import "./styles/ScreensStyles.css";
import axios from "axios";

const Modal = lazy(() => import("../components/Modal"));

const SaleResume = () => {
  const storage = window.localStorage;

  const [sellConfirmationIsOpen, setSellConfirmationModalOpen] =
    useState(false);

  function openSellConfirmationModal() {
    setSellConfirmationModalOpen(true);
  }

  function closeSellConfirmationModal() {
    setSellConfirmationModalOpen(false);
  }

  function emptyCart() {
    storage.removeItem("shoppingCart");
  }

  let shoppingCart = { saleData: [] };

  if (storage.getItem("shoppingCart")) {
    shoppingCart = JSON.parse(storage.getItem("shoppingCart"));
  }

  const sell = () => {
    let currentUser = JSON.parse(storage.getItem("user"));
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    axios
      .post(
        `https://venda-pues-sales-api.herokuapp.com/v1/sale/${currentUser.userId}`,
        shoppingCart,
        config
      )
      .then((res) => {
        if (res.status === 200) {
          storage.removeItem("shoppingCart");
          openSellConfirmationModal();
        } else {
          alert("Error al realizar la venta, intente nuevamente.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error al realizar la venta, intente nuevamente.");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <button
          type="button"
          onClick={sell}
          className="btn btn-primary create-product-button"
        >
          Vender!
        </button>
        <Suspense
          fallback={
            <img src={logo} className="App-logo" alt="" width="100px" />
          }
        >
          <Modal
            handleClose={closeSellConfirmationModal}
            show={sellConfirmationIsOpen}
            child="Confirmation"
            confirmationMessage="Felicidades! Realizaste una nueva venta."
          />
        </Suspense>
        <button
          type="button"
          onClick={emptyCart}
          className="btn btn-primary create-product-button"
        >
          Vaciar canasta
        </button>
        <ul>
          {shoppingCart.saleData.map((item, i) => {
            return (
              <li key={i}>
                <span>{item.productId + " " + item.quantity}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SaleResume;
