import React, {useState, useEffect} from "react";
import "./styles/ComponentsStyles.css";
import axios from "axios";

const SalesItem = ({ salesItem }) => {
  var date = new Date(salesItem?.soldAt);

  const storage = window.localStorage;

  const [productNames, setProductNames] = useState([]);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function formatDate(dateToFormat) {
    var splitedDate = dateToFormat.split(" ");
    const months = {
      Jan: "Enero",
      Feb: "Febrero",
      Mar: "Marzo",
      Apr: "Abril",
      May: "Mayo",
      Jun: "Junio",
      Jul: "Julio",
      Aug: "Agosto",
      Sep: "Septiembre",
      Oct: "Octubre",
      Nov: "Noviembre",
      Dec: "Diciembre",
    };

    return (
      months[splitedDate[1]] + " " + splitedDate[2] + " de " + splitedDate[3]
    );
  }
  

  useEffect(() => {
    let currentUser = JSON.parse(storage.getItem("user"));
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    axios
      .post(
        `https://venda-pues-products-api-2.herokuapp.com/v1/product/names`,
        salesItem.products,
        config
      )
      .then((res) => {
        setProductNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })

  return (
    <div className="product-item-container">
      <div className="product-item-name">Venta N° {salesItem?.id}</div>
      <div className="product-details-container">
        <div className="row mt-3">
          <div className="col-5">
            <h5>
              <b>Fecha:</b> {formatDate(date.toDateString())}
            </h5>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {salesItem?.products.map((product, i) => {
              if (product) {
                return (
                  <tr>
                    <td>{product.quantity}</td>
                    <td>{productNames[i]}</td>
                    <td>{formatter.format(product.productPrice)}</td>
                    <td>
                      {formatter.format(
                        product.productPrice * product.quantity
                      )}
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th>Total</th>
              <th>{formatter.format(salesItem?.amount)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SalesItem;
