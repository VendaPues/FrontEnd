import React, {useEffect, useState} from "react";
import "./styles/ScreensStyles.css";
import Navbar from "../components/Navbar";
import mercado from "../assets/images/mercado.jpg";
import balance from "../assets/images/balance.png";
import ventas from "../assets/images/sales.jpg";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const storage = window.localStorage;

  let history = useHistory();

  const [userData, setUserData] = useState({});

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storage]);

  const goToInventory = () => {
    history.push("/products");
  };

  const goToBalance = () => {
    history.push("/balance");
  };

  const goToSales = () => {
    history.push("/sales");
  };

  return (
    <div>
      <Navbar />
      <h1 className="business-name-title">{userData.businessName}</h1>
      <h2 className="home-message">¡Bienvenido {userData.name}! Nos alegra tenerte de vuelta.</h2>
      <div className="homeContainer row">
        <div className="homeTab col-4" onClick={goToInventory}>
          <div className="homeTabTitle">Inventario</div>
          <img className="homeTabImage" alt="" src={mercado} />
        </div>
        <div className="homeTab col-4" onClick={goToBalance}>
          <div className="homeTabTitle">Reporte</div>
          <img className="homeTabImage" alt="" src={balance} />
        </div>
        <div className="homeTab col-4" onClick={goToSales}>
          <div className="homeTabTitle">Ventas</div>
          <img className="homeTabImage" alt="" src={ventas} />
        </div>
      </div>
    </div>
  );
};

export default Home;
