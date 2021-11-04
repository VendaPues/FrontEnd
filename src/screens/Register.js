import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './styles/ScreensStyles.css';
import logo from "../assets/images/logo.jpg";
import axios from 'axios';

const Register = () => {
    let history = useHistory();
    const storage = window.localStorage;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [storeName, setStoreName] = useState("");
    const [owner, setOwner] = useState("");
    const [lastOwner, setLastOwner] = useState("");
    const [registerType, setRegisterType] = useState(null);

    useEffect(() => {
        let emailToRegister = storage.getItem("emailToRegister");
        setEmail(emailToRegister);
    }, [])

    const login = () => {
        let formItem = {
            name: owner,
            lastName: lastOwner,
            businessName: storeName,
            email: email,
            password: password,
            role: registerType
        };
        if (!!owner && !!lastOwner && !!storeName && !!email && !!password && !!registerType ) {
            axios.post(`https://venda-pues-users-api.herokuapp.com/v1/user`, formItem)
            .then(res => {
                if (res.status === 200) {
                    axios.post(`https://venda-pues-users-api.herokuapp.com/v1/auth`, {email: email, password: password})
                    .then(res => {
                        if (res.status === 200) {
                            storage.setItem('user', JSON.stringify(res.data));
                            history.push("/home");
                        }
                    })
                } else {
                    alert("Por favor revise que los campos se encuentren diligenciados correctamente.");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Por favor revise que los campos se encuentren diligenciados correctamente.");
            });
        } else {
            alert("Por favor revise que los campos se encuentren diligenciados correctamente.");
        }
    }

    const selectStoreRegister = () => {
        setRegisterType(1);
    }

    const selectProviderRegister = () => {
        setRegisterType(2);
    }

    return (
        <div>
            <img className="welcomeLogo" src={logo} />
            <div className="registerForm container col-3">
                <div className="registerTitle">Registro</div>
                <div className="input-group flex-nowrap mb-4">
                    <span className="input-group-text" id="addon-wrapping">
                        <i className="far fa-envelope"></i>
                    </span>
                    <input type="text" className="form-control" value={email} onChange={(value) => setEmail(value.target.value)} placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
                </div>
                <div className="input-group flex-nowrap mb-4">
                    <span className="input-group-text" id="addon-wrapping">
                        <i className="far fa-asterisk fa-lg"></i>
                    </span>
                    <input type="password" className="form-control" onChange={(value) => setPassword(value.target.value)} placeholder="Contraseña" aria-label="Contraseña" aria-describedby="addon-wrapping" />
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-check">
                            <input className="form-check-input" onChange={(value) => selectStoreRegister(value.target.checked)} type="radio" name="registerRadio" id="storeRadio" />
                            <label className="form-check-label registerRadioLabels" htmlFor="storeRadio">
                                Registra tu tienda
                            </label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-check">
                            <input className="form-check-input" onChange={(value) => selectProviderRegister(value.target.checked)} type="radio" name="registerRadio" id="provRadio" />
                            <label className="form-check-label registerRadioLabels" htmlFor="provRadio">
                                Registro de proveedor
                            </label>
                        </div>
                    </div>
                </div>
                <div className="input-group flex-nowrap mb-4 mt-4">
                    <input type="text" className="form-control" onChange={(value) => setStoreName(value.target.value)} placeholder="Nombre de la tienda" aria-label="Nombre de la tienda" aria-describedby="addon-wrapping" />
                </div>
                <div className="input-group flex-nowrap mb-4">
                    <input type="text" className="form-control" onChange={(value) => setOwner(value.target.value)} placeholder="Nombre(s) del propietario" aria-label="Propietario" aria-describedby="addon-wrapping" />
                </div>
                <div className="input-group flex-nowrap mb-1">
                    <input type="text" className="form-control" onChange={(value) => setLastOwner(value.target.value)} placeholder="Apellido(s) del propietario" aria-label="Propietario" aria-describedby="addon-wrapping" />
                </div>
                <button type="button" onClick={login} className="btn btn-primary registerButton">Login</button>
            </div>
        </div>
    );
};

export default Register;