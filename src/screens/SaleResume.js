import React from "react";
import Navbar from "../components/Navbar";
import "./styles/ScreensStyles.css";

const SaleResume = () => {
  const storage = window.localStorage;

  let saleData = JSON.parse(storage.getItem("shoppingCart"));

  return (
    <div>
      <Navbar />
      <div className="container">
        <ul>
          {saleData.map((item) => {
            return (
              <li>
                <span>{item.productId}</span>
                <span>{item.quantity}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SaleResume;
