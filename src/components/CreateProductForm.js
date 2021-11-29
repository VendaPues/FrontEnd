import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/ComponentsStyles.css";
import axios from "axios";

const CreateProductForm = ({ closeAction }) => {
  let history = useHistory();
  const storage = window.localStorage;

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [tax, setTax] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const createProduct = () => {
    let currentUser = JSON.parse(storage.getItem("user"));
    let newProduct = {
      productName: productName,
      description: description,
      price: price,
      salesPrice: salesPrice,
      stock: parseInt(stock),
      tax: parseFloat(tax),
      imageUrl: imageUrl,
    };
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    if (
      !!productName &&
      !!description &&
      !!price &&
      !!salesPrice &&
      !!imageUrl
    ) {
      axios
        .post(
          `https://venda-pues-products-api-2.herokuapp.com/v1/product/${currentUser.userId}`,
          newProduct,
          config
        )
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          } else {
            alert("El formulario no esta diligenciado correctamente.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("El formulario no esta diligenciado correctamente.");
        });
    } else {
      alert("El formulario no esta diligenciado correctamente.");
    }
  };

  return (
    <div className="container">
      <div className="updateTitle">Actualizar Producto</div>
      <div className="input-group flex-nowrap mb-4 mt-4">
        <input
          type="text"
          className="form-control"
          onChange={(value) => setProductName(value.target.value)}
          placeholder="Nombre del Producto"
          aria-label="Nombre del Producto"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-4">
        <input
          type="text"
          className="form-control"
          onChange={(value) => setDescription(value.target.value)}
          placeholder="Descripción"
          aria-label="Descripción"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-4">
        <input
          type="text"
          className="form-control"
          onChange={(value) => setPrice(value.target.value)}
          placeholder="Precio"
          aria-label="Precio"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-1">
        <input
          type="text"
          className="form-control"
          onChange={(value) => setSalesPrice(value.target.value)}
          placeholder="Precio de Venta"
          aria-label="Precio de Venta"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-4 mt-4">
        <input
          type="number"
          className="form-control"
          onChange={(value) => setStock(value.target.value)}
          placeholder="Unidades en Inventario"
          aria-label="Unidades en Inventario"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-4">
        <input
          type="number"
          className="form-control"
          onChange={(value) => setTax(value.target.value)}
          placeholder="Impuestos (%)"
          aria-label="Impuestos (%)"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-1">
        <input
          type="text"
          className="form-control"
          onChange={(value) => setImageUrl(value.target.value)}
          placeholder="Url de la Imagen"
          aria-label="Url de la Imagen"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="update-buttons-container">
        <button
          type="button"
          onClick={createProduct}
          className="btn btn-primary update-form-button"
        >
          Crear Producto
        </button>
        <button
          type="button"
          onClick={closeAction}
          className="btn btn-secondary update-form-button"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CreateProductForm;
