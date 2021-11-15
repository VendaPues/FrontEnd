import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './styles/ScreensStyles.css';
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";

const Welcome = () => {
    let history = useHistory();
    const storage = window.localStorage;

    const [email, setEmail] = useState("");

    const goToRegister = () => {
        if (!!email) {
            storage.setItem('emailToRegister', email);
            history.push("/register");
        } else {
            alert("Introduce tu correo para continuar con el registro.");
        }
    }

    return (
        <div className="welcomeContainer">
            <img className="welcomeLogo" src={logo} alt=""/>
            <div className="welcomeLoginButton">
                <Link to="/login" type="button" className="btn btn-primary welcomeLoginButtonBtn">Iniciar Sesión</Link>
            </div>
            <div className="welcomeMailCard">
                <div className="welcomeMainText">
                    Vende, monitorea y mucho más
                </div>
                <div className="welcomeSecondText">
                    Potencia tu negocio, vende mucho y gasta poco.
                </div>
                <div className="welcomeThirdText">
                    ¿Quieres registrarte ahora? Ingresa tu email para crear una cuenta
                </div>
                <div className="input-group mb-3">
                    <input type="text" onChange={(value) => setEmail(value.target.value)} className="form-control col-8" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                    <div className="col-1"></div>
                    <button type="button" onClick={goToRegister} className="btn btn-primary col-3">Comenzar</button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;