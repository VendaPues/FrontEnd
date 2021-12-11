import React, { useEffect, useState } from "react";
import "./styles/ScreensStyles.css";
import Navbar from "../components/Navbar";
import axios from "axios";

const Account = () => {
  const storage = window.localStorage;

  const [userData, setUserData] = useState({});

  const [date, setDate] = useState(new Date());

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
      .get(
        `https://venda-pues-users-api.herokuapp.com/v1/user/${currentUser.userId}`,
        config
      )
      .then((res) => {
        setUserData(res.data);
        setDate(new Date(res.data.createdAt));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storage]);

  return (
    <div>
      <Navbar />
      <h1 className="business-name-title">{userData.businessName}</h1>
      <div className="container">
        <div className="card balance-card">
          <div className="card-body">
            Propietario: <b>{userData.name + " " + userData.lastName}</b>
          </div>
        </div>
        <div className="card balance-card">
          <div className="card-body">
            Email registado: <b>{userData.email}</b>
          </div>
        </div>
        <div className="card balance-card">
          <div className="card-body">
            Negocio: <b>{userData.businessName}</b>
          </div>
        </div>
      </div>
      <h2 className="account-date-message">
        Miembro desde {formatDate(date.toDateString())}.
      </h2>
    </div>
  );
};

export default Account;
