import React from "react";
import "./styles/ComponentsStyles.css";
import UpdateProductForm from "./UpdateProductForm";

const Modal = ({ handleClose, show, item }) => {

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button type="button" onClick={handleClose} className="btn-close" aria-label="Close"></button>
        <UpdateProductForm product={item} closeAction={handleClose}/>
      </section>
    </div>
  );
};

export default Modal;
