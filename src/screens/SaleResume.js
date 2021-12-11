import React, { useState, Suspense, lazy, useEffect } from "react";
import logo from "../assets/svg/logo.svg";
import Navbar from "../components/Navbar";
import "./styles/ScreensStyles.css";
import axios from "axios";
import ProductKartItem from "../components/ProductKartItem";
import { useHistory } from "react-router-dom";

const Modal = lazy(() => import("../components/Modal"));

const SaleResume = () => {
  const storage = window.localStorage;

  let history = useHistory();

  const [sellConfirmationIsOpen, setSellConfirmationModalOpen] =
    useState(false);

  const [products, setProducts] = useState([]);

  function openSellConfirmationModal() {
    setSellConfirmationModalOpen(true);
  }

  function closeSellConfirmationModal() {
    setSellConfirmationModalOpen(false);
    goToSales();
  }

  const goToSales = () => {
    history.push("/sales");
  };

  function getTotal() {
    var total = 0;
    shoppingCart.saleData.forEach((element) => {
      total += element.productPrice * element.quantity;
    });

    return total;
  }

  let shoppingCart = { saleData: [] };

  if (storage.getItem("shoppingCart")) {
    shoppingCart = JSON.parse(storage.getItem("shoppingCart"));
  }

  useEffect(() => {
    let currentUser = JSON.parse(storage.getItem("user"));
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    axios
      .post(
        `https://venda-pues-products-api-2.herokuapp.com/v1/product/on-kart`,
        shoppingCart,
        config
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const sell = () => {
    let currentUser = JSON.parse(storage.getItem("user"));
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    console.log("hola");
    axios
      .post(
        //`https://venda-pues-sales-api.herokuapp.com/v1/sale/${currentUser.userId}`,
        `http://localhost:8080/v1/sale/${currentUser.userId}`,
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

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <Navbar />
      <div className="container">
        <span className="balance-title">Canasta</span>
        <table className="kart-table table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Unidades</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => {
              if (storage.getItem("shoppingCart")) {
                return (
                  <ProductKartItem
                    key={i}
                    productItem={item}
                    quantity={shoppingCart.saleData[i].quantity}
                  ></ProductKartItem>
                );
              }
              return null;
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Total</th>
              <th>{formatter.format(getTotal())}</th>
            </tr>
          </tfoot>
        </table>
        <div className="kart-buttons-container">
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
        </div>
      </div>
    </div>
  );
};

export default SaleResume;
