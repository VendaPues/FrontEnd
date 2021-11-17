import React, { useState, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg"
import './styles/ComponentsStyles.css';

const Modal = lazy(() => import("../components/Modal"));

const ProductItem = ({productItem}) => {

    const [updateModalIsOpen, setUpdateModalOpen] = useState(false);

    const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);

    function openUpdateModal() {
        setUpdateModalOpen(true);
    }

    function closeUpdateModal() {
        setUpdateModalOpen(false);
    }

    function openDeleteModal() {
        setDeleteModalOpen(true);
    }

    function closeDeleteModal() {
        setDeleteModalOpen(false);
    }

    return (
        <div className="productItemContainer">
            <div className="productItemName">{productItem?.productName}</div>
            <div className="row">
                <div className="col-10">
                    <div className="productItemPrice">Precio: ${productItem?.salesPrice}</div>
                    <div className="productItemPrice">Unidades: {productItem?.stock}</div>
                    <div className="productItemPrice">Descripción: {productItem?.description}</div>
                    <button type="button" onClick={openUpdateModal} className="btn btn-primary col-3 productItemButton">Editar</button>
                    <Suspense fallback={<img src={logo} className="App-logo" alt="" width="100px"/>}>
                        <Modal handleClose={closeUpdateModal} show={updateModalIsOpen} item={productItem} child="U"/>
                    </Suspense>

                    <button type="button" onClick={openDeleteModal} className="btn btn-danger col-3 productItemButton">Eliminar</button>
                    <Suspense fallback={<img src={logo} className="App-logo" alt="" width="100px"/>}>
                        <Modal handleClose={closeDeleteModal} show={deleteModalIsOpen} item={productItem} child="D"/>
                    </Suspense>
                </div>
                <img className="productImage col-2" src={productItem?.imageUrl} alt=""/>
            </div>
        </div>
    );
};

export default ProductItem;
