import React from "react";
import "./styles/ComponentsStyles.css";

const ProductItemInfoCard = ({ productItem }) => {
  return (
    <div className="row product-item-info-container">
      <img
        className="col-1 product-details-image"
        src={productItem?.imageUrl}
        alt={productItem?.id}
      />
      <span className="col-3">{productItem?.productName}</span>
      <div className="col order-product-button">
        <button
          type="button"
          className="btn btn-primary"
        >
          Ordenar unidades
        </button>
      </div>
    </div>
  );
};

export default ProductItemInfoCard;
