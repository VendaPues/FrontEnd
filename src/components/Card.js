import React from "react";
import "./styles/ComponentsStyles.css";

const Card = () => {
  return (
    <div className="card">
      <img className="card-img-top" src="https://i.ibb.co/LPqJW36/lm140a-chupeta-bom-bom-bum-colombina.png" alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};

export default Card;
