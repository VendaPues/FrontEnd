import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/ScreensStyles.css";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";

const Welcome = () => {
  let history = useHistory();
  const storage = window.localStorage;

  const [email, setEmail] = useState("");

  const goToRegister = () => {
    if (!!email) {
      storage.setItem("emailToRegister", email);
      history.push("/register");
    } else {
      alert("Introduce tu correo para continuar con el registro.");
    }
  };

  return (
    <div className="welcome-container">
      <img className="welcome-logo" src={logo} alt="" />
      <div className="welcome-login-button">
        <Link
          to="/login"
          type="button"
          className="btn btn-primary welcome-login-button-btn"
        >
          Iniciar Sesión
        </Link>
      </div>
      <div className="welcome-mail-card container">
        <div className="welcome-main-text">Vende, monitorea y mucho más</div>
        <div className="welcome-second-text">
          Potencia tu negocio, vende mucho y gasta poco.
        </div>
        <div className="welcome-third-text">
          ¿Quieres registrarte ahora? Ingresa tu email para crear una cuenta
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            onChange={(value) => setEmail(value.target.value)}
            className="form-control col-8"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
          <div className="col-1"></div>
          <button
            type="button"
            onClick={goToRegister}
            className="btn btn-primary col-3"
          >
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
