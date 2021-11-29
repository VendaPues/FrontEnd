import React from "react";
import "./styles/ComponentsStyles.css";

const SalesItem = ({ salesItem }) => {
  let date = new Date(salesItem?.soldAt).toString();

  let amount = new Number(salesItem?.amount).toString();

  return (
    <div className="product-item-container">
      <div className="product-item-name">{salesItem?.id}</div>
      <div className="product-details-container">
        <div className="product-item-price">
          <b>Fecha:</b> {date}
        </div>
        <div className="product-item-price">
          <b>Total:</b> ${amount}
        </div>
      </div>
    </div>
  );
};

export default SalesItem;
