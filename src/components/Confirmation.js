import React from "react";
import "./styles/ComponentsStyles.css";
import ConfirmationImage from "../assets/images/confirm-icon.png";

const Confirmation = ({ closeAction, message }) => {
  return (
    <div className="container">
      <div className="confirmation-title">
        <img src={ConfirmationImage} alt="" width="100px" />
      </div>
      <div className="confirmation-title">{message}</div>
      <div className="confirmation-buttons-container">
        <button
          className="btn btn-secondary confirmation-button"
          onClick={closeAction}
          type="button"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
