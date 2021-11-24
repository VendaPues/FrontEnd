import React, { useState, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg";
import "./styles/ComponentsStyles.css";

const Modal = lazy(() => import("../components/Modal"));

const ProductItem = ({ productItem, shopingCartAction }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const [cartConfirmationIsOpen, setCartConfirmationModalOpen] =
    useState(false);

  const [updateModalIsOpen, setUpdateModalOpen] = useState(false);

  const [deleteModalIsOpen, setDeleteModalOpen] = useState(false);

  function openCartConfirmationModal() {
    setCartConfirmationModalOpen(true);
  }

  function closeCartConfirmationModal() {
    setCartConfirmationModalOpen(false);
  }

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
    openCartConfirmationModal();
    shopingCartAction({
      productId: productItem?.id,
      quantity: selectedQuantity,
    });
  }

  function handleQuantityAdition() {
    if (selectedQuantity < productItem.stock) {
      let selectedQuantityCopy = selectedQuantity;
      selectedQuantityCopy = selectedQuantityCopy + 1;
      setSelectedQuantity(selectedQuantityCopy);
    }
  }

  function handleQuantityReduction() {
    if (selectedQuantity > 0) {
      let selectedQuantityCopy = selectedQuantity;
      selectedQuantityCopy = selectedQuantityCopy - 1;
      setSelectedQuantity(selectedQuantityCopy);
    }
  }

  return (
    <div className="product-item-container">
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

          <div className="input-group product-item-button">
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleQuantityReduction}
              >
                -
              </button>
            </div>
            <fieldset disabled>
              <input
                className="form-control product-quantity-input"
                placeholder={selectedQuantity}
              />
            </fieldset>
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleQuantityAdition}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShopingCartAction}
            className="btn btn-primary col-3 product-item-button"
          >
            Añadir al carrito
          </button>
          <Suspense
            fallback={
              <img src={logo} className="App-logo" alt="" width="100px" />
            }
          >
            <Modal
              handleClose={closeCartConfirmationModal}
              show={cartConfirmationIsOpen}
              item={productItem}
              child="C"
            />
          </Suspense>

          <button
            type="button"
            onClick={openUpdateModal}
            className="btn btn-secondary col-3 product-item-button"
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
            className="btn btn-danger col-3 product-item-button"
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
          className="product-image col-2"
          src={productItem?.imageUrl}
          alt={productItem?.id}
        />
      </div>
    </div>
  );
};

export default ProductItem;
