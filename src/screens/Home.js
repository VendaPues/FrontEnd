import React from "react";
import './styles/ScreensStyles.css';
import Navbar from "../components/Navbar";
import mercado from "../assets/images/mercado.jpg";
import balance from "../assets/images/balance.png";
import ventas from "../assets/images/sales.jpg";
import { useHistory } from "react-router-dom";

const Home = () => {
    let history = useHistory();

    const goToInventory = () => {
        history.push("/products");
    }

    const goToBalance = () => {
        history.push("/balance");
    }

    const goToSales = () => {
        history.push("/sales");
    }

    return (
        <div>
            <Navbar />
            <div className="homeContainer row">
                <div className="homeTab col-4" onClick={goToInventory}>
                    <div className="homeTabTitle">Inventario</div>
                    <img className="homeTabImage" src={mercado} />
                </div>
                <div className="homeTab col-4" onClick={goToBalance}>
                    <div className="homeTabTitle">Balance</div>
                    <img className="homeTabImage" src={balance} />
                </div>
                <div className="homeTab col-4" onClick={goToSales}>
                    <div className="homeTabTitle">Ventas</div>
                    <img className="homeTabImage" src={ventas} />
                </div>
            </div>
        </div>
    );
};

export default Home;