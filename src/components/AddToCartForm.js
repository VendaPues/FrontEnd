import React from "react";

const AddToCartForm = ({product, addToCartAction,closeAction}) => {

    function addToCartActionHandler() {
        addToCartAction();
        closeAction();
    }

    return (
        <div className="container">
            <div className="add-to-cart-form-title">{"¿Quieres añadir el producto " + product.productName + " al carrito?" } </div>
            <div className="add-to-cart-buttons-container">
                <button type="button" onClick={addToCartActionHandler} className="btn btn-success add-to-cart-form-button">Confirmar</button>
                <button type="button" onClick={closeAction} className="btn btn-secondary add-to-cart-form-button">Cancelar</button>
            </div>
        </div>
    );
};

export default AddToCartForm;