import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./styles/ScreensStyles.css";
import logo from "../assets/images/logo.jpg";
import prods from "../assets/images/productsCalc.jpg";

const Login = () => {
  let history = useHistory();
  const storage = window.localStorage;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    let formItem = {
      email: email,
      password: password,
    };
    if (!!email && !!password) {
      axios
        .post(`https://venda-pues-users-api.herokuapp.com/v1/auth`, formItem)
        .then((res) => {
          if (res.status === 200) {
            storage.setItem("user", JSON.stringify(res.data));
            history.push("/home");
          } else {
            alert("El correo o contraseña son incorrectos.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("El correo o contraseña son incorrectos.");
        });
    } else {
      alert(
        "Por favor revise que los campos se encuentren diligenciados correctamente."
      );
    }
  };

  return (
    <div>
      <img className="welcomeLogo" alt="welcome-logo" src={logo} />
      <img className="loginProducts" alt="login-products" src={prods} />
      <div className="registerForm loginForm container col-3">
        <div className="registerTitle">Login</div>
        <div className="input-group flex-nowrap mb-4">
          <span className="input-group-text" id="addon-wrapping">
            <i className="far fa-envelope"></i>
          </span>
          <input
            type="text"
            className="form-control"
            onChange={(value) => setEmail(value.target.value)}
            placeholder="Email"
            aria-label="Email"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div className="input-group flex-nowrap mb-4">
          <span className="input-group-text" id="addon-wrapping">
            <i className="far fa-asterisk fa-lg"></i>
          </span>
          <input
            type="password"
            className="form-control"
            onChange={(value) => setPassword(value.target.value)}
            placeholder="Contraseña"
            aria-label="Contraseña"
            aria-describedby="addon-wrapping"
          />
        </div>
        <button
          onClick={login}
          type="button"
          className="btn btn-primary registerButton mb-4"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
