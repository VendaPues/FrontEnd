import React from "react";
import "./styles/ComponentsStyles.css";

const ProductKartItem = ({ productItem, quantity }) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <tr>
      <td>
        <img
          className="product-kart-image"
          src={productItem.imageUrl}
          alt={productItem?.id}
        />
      </td>
      <td>{productItem.productName}</td>
      <td>{formatter.format(productItem.salesPrice)}</td>
      <td>{quantity}</td>
      <td>{formatter.format(productItem.salesPrice * quantity)}</td>
    </tr>
  );
};

export default ProductKartItem;
