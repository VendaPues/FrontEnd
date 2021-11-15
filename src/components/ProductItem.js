import React, { useState, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg"
import './styles/ComponentsStyles.css';

const Modal = lazy(() => import("../components/Modal"));

const ProductItem = ({productItem}) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="productItemContainer">
            <div className="productItemName">{productItem?.productName}</div>
            <div className="row">
                <div className="col-10">
                    <div className="productItemPrice">Precio: ${productItem?.salesPrice}</div>
                    <div className="productItemPrice">Unidades: {productItem?.stock}</div>
                    <div className="productItemPrice">Descripción: {productItem?.description}</div>
                    <button type="button" onClick={openModal} className="btn btn-primary col-3 productItemButton">Editar</button>
                    <Suspense fallback={<img src={logo} className="App-logo" alt="" width="100px"/>}>
                        <Modal handleClose={closeModal} show={modalIsOpen} item={productItem}/>
                    </Suspense>
                    <button type="button" className="btn btn-danger col-3 productItemButton">Eliminar</button>
                </div>
                <img className="productImage col-2" src={productItem?.imageUrl} alt=""/>
            </div>
        </div>
    );
};

export default ProductItem;
