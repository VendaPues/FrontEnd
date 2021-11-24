import React from "react";
import "./styles/ComponentsStyles.css";
import UpdateProductForm from "./UpdateProductForm";
import DeleteProductForm from "./DeleteProductForm";
import Confirmation from "./Confirmation";

//content: U (update product), D (delete product), C (add to cart confirmation)
const Modal = ({ handleClose, show, item, child }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  if (child === "U") {
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <UpdateProductForm product={item} closeAction={handleClose} />
        </section>
      </div>
    );
  } else if (child === "D") {
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <DeleteProductForm product={item} closeAction={handleClose} />
        </section>
      </div>
    );
  } else if (child === "C") {
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <Confirmation
            closeAction={handleClose}
            message={"Se añadió al carrito."}
          />
        </section>
      </div>
    );
  }
};

export default Modal;
