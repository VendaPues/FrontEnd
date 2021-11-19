import React, { useState, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg";
import "./styles/ComponentsStyles.css";
import Dropdown from "react-dropdown";

const Modal = lazy(() => import("../components/Modal"));

const ProductItem = ({ productItem, shopingCartAction }) => {
  const availableStockOptions = Array.from(
    Array(productItem?.stock + 1).keys()
  );

  let selectedQuantity = 0;

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

  function handleShopingCartAction() {
    shopingCartAction({
      productId: productItem?.id,
      units: selectedQuantity,
    });
  }

  function handleQuantitySelection(payload) {
    selectedQuantity = payload.value;
  }

  return (
    <div className="productItemContainer">
      <div className="productItemName">{productItem?.productName}</div>
      <div className="row">
        <div className="col-10">
          <div className="productItemPrice">
            Precio: ${productItem?.salesPrice}
          </div>
          <div className="productItemPrice">Unidades: {productItem?.stock}</div>
          <div className="productItemPrice">
            Descripción: {productItem?.description}
          </div>
          
          <Dropdown
            className="btn btn-secondary col-3 productItemButton"
            options={availableStockOptions}
            onChange={handleQuantitySelection}
            value={selectedQuantity}
            placeholder="Cantidad"
          />
          <button
            type="button"
            onClick={handleShopingCartAction}
            className="btn btn-success col-3 productItemButton"
          >
            Añadir al carrito
          </button>
          <button
            type="button"
            onClick={openUpdateModal}
            className="btn btn-primary col-3 productItemButton"
          >
            Editar
          </button>
          <Suspense
            fallback={
              <img src={logo} className="App-logo" alt="" width="100px" />
            }
          >
            <Modal
              handleClose={closeUpdateModal}
              show={updateModalIsOpen}
              item={productItem}
              child="U"
            />
          </Suspense>
          <button
            type="button"
            onClick={openDeleteModal}
            className="btn btn-danger col-3 productItemButton"
          >
            Eliminar
          </button>
          <Suspense
            fallback={
              <img src={logo} className="App-logo" alt="" width="100px" />
            }
          >
            <Modal
              handleClose={closeDeleteModal}
              show={deleteModalIsOpen}
              item={productItem}
              child="D"
            />
          </Suspense>
        </div>
        <img
          className="productImage col-2"
          src={productItem?.imageUrl}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProductItem;
