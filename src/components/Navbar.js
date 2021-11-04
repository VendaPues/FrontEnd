import React, { useState, useEffect } from "react";
import './styles/ComponentsStyles.css';
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = () => {
    let history = useHistory();
    const storage = window.localStorage;
    const [inicioClass, setInicioClass] = useState("");
    const [cuentaClass, setCuentaClass] = useState("");

    useEffect(() => {
        if (window.location.pathname === "/home") {
            setInicioClass("active");
            setCuentaClass("");
        } else if (window.location.pathname === "/account") {
            setInicioClass("");
            setCuentaClass("active");
        }
    });

    const logOut = () => {
        storage.clear();
        history.push("/");
    }

    return (
        <div className="navbarContainer row">
            <img className="navbarLogo col-2" src={logo} />
            <Link to="/home" className={`col-1 navbarLabel ${inicioClass}`}>Inicio</Link>
            <Link to="/account" className={`col-1 navbarLabel ${cuentaClass}`}>Cuenta</Link>
            <button onClick={logOut} className={`col-1 navbarLabel`}>Salir</button>
        </div>
    );
};

export default Navbar;