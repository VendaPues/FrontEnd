import React from "react";
import './styles/ComponentsStyles.css';

const ProductItem = ({productItem}) => {

    return (
        <div className="productItemContainer">
            <div className="productItemName">{productItem?.productName}</div>
            <div className="row">
                <div className="col-10">
                    <div className="productItemPrice">Precio: ${productItem?.salesPrice}</div>
                    <div className="productItemPrice">Unidades: {productItem?.stock}</div>
                    <button type="button" className="btn btn-primary col-3 productItemButton">Añadir más unidades</button>
                </div>
                <img className="productImage col-2" src={productItem?.imageUrl} />
            </div>
        </div>
    );
};

export default ProductItem;