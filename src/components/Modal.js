import React from "react";
import "./styles/ComponentsStyles.css";
import UpdateProductForm from "./UpdateProductForm";
import DeleteProductForm from "./DeleteProductForm";
import Confirmation from "./Confirmation";
import CreateProductForm from "./CreateProductForm";

const Modal = ({ handleClose, show, item, child, confirmationMessage }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  if (child === "UpdateProduct") {
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <UpdateProductForm product={item} closeAction={handleClose} />
        </section>
      </div>
    );
  } else if (child === "DeleteProduct") {
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <DeleteProductForm product={item} closeAction={handleClose} />
        </section>
      </div>
    );
  } else if (child === "Confirmation") {
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <Confirmation
            closeAction={handleClose}
            message={confirmationMessage}
          />
        </section>
      </div>
    );
  } else if (child === "CreateProduct") {
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <CreateProductForm
            closeAction={handleClose}
          />
        </section>
      </div>
    );
  }
};

export default Modal;
