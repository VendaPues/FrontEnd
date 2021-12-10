import React, { useState } from "react";
import axios from "axios";

const UpdateProductForm = ({ product, closeAction }) => {
  const storage = window.localStorage;

  const [productName, setProductName] = useState(product.productName);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [salesPrice, setSalesPrice] = useState(product.salesPrice);
  const [stock, setStock] = useState(product.stock);
  const [tax, setTax] = useState(product.tax);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);

  const updateProduct = () => {
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
        .put(
          `https://venda-pues-products-api-2.herokuapp.com/v1/product/${product.id}`,
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
      <div className="input-group flex-nowrap mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text">Nombre</span>
        </div>
        <input
          type="text"
          className="form-control"
          value={productName}
          onChange={(value) => setProductName(value.target.value)}
          placeholder="Nombre del Producto"
          aria-label="Nombre del Producto"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text">Descripción</span>
        </div>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(value) => setDescription(value.target.value)}
          placeholder="Descripción"
          aria-label="Descripción"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text">Precio</span>
        </div>
        <input
          type="text"
          className="form-control"
          value={price}
          onChange={(value) => setPrice(value.target.value)}
          placeholder="Precio"
          aria-label="Precio"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-1">
        <div className="input-group-prepend">
          <span className="input-group-text">Precio de venta</span>
        </div>
        <input
          type="text"
          className="form-control"
          value={salesPrice}
          onChange={(value) => setSalesPrice(value.target.value)}
          placeholder="Precio de Venta"
          aria-label="Precio de Venta"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-4 mt-4">
        <div className="input-group-prepend">
          <span className="input-group-text">Stock</span>
        </div>
        <input
          type="number"
          className="form-control"
          value={stock}
          onChange={(value) => setStock(value.target.value)}
          placeholder="Unidades en Inventario"
          aria-label="Unidades en Inventario"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text">Impuestos</span>
        </div>
        <input
          type="number"
          className="form-control"
          value={tax}
          onChange={(value) => setTax(value.target.value)}
          placeholder="Impuestos (%)"
          aria-label="Impuestos (%)"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="input-group flex-nowrap mb-1">
        <div className="input-group-prepend">
          <span className="input-group-text">Imagen</span>
        </div>
        <input
          type="text"
          className="form-control"
          value={imageUrl}
          onChange={(value) => setImageUrl(value.target.value)}
          placeholder="Url de la Imagen"
          aria-label="Url de la Imagen"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div className="update-buttons-container">
        <button
          type="button"
          onClick={updateProduct}
          className="btn btn-primary update-form-button"
        >
          Actualizar
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

export default UpdateProductForm;
