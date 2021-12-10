import React from "react";
import "./styles/ComponentsStyles.css";

const ProductItemInfoCard = ({ productItem }) => {

  return (
    <div className="product-item-info-container">
      <div className="product-item-name">{productItem?.productName}</div>
      <div className="row">
        <div className="col-10">
          <div className="product-details-container">
            <div className="product-item-price">
              <b>Precio:</b> ${productItem?.salesPrice}
            </div>
            <div className="product-item-price">
              <b>Unidades disponibles:</b> {productItem?.stock}
            </div>
            <div className="product-item-price">
              <b>Descripción:</b> {productItem?.description}
            </div>
          </div>
        </div>
        <img
          className="product-image col-2"
          src={productItem?.imageUrl}
          alt={productItem?.id}
        />
      </div>
    </div>
  );
};

export default ProductItemInfoCard;