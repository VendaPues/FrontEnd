import React from "react";
import "./styles/ComponentsStyles.css";

const SalesItem = ({ salesItem }) => {
  return (
    <div className="productItemContainer">
      <div className="productItemName">{salesItem?.name}</div>
      <div className="row">
        <div className="col-10">
          <div className="productItemPrice">Precio: ${salesItem?.total}</div>
          <div className="productItemPrice">Unidades: {salesItem?.units}</div>
          <button
            type="button"
            className="btn btn-primary col-3 productItemButton"
          >
            Ver productos
          </button>
        </div>
        <img className="productImage col-2" alt="" src={salesItem?.image} />
      </div>
    </div>
  );
};

export default SalesItem;
