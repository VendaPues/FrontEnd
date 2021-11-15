import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Navbar from "../components/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import './styles/ScreensStyles.css';
import bars from "../assets/images/bars.jpg";
import productExample from "../assets/images/productExample.jpg";

const data = {
    sales: 100,
    total: 1_500_000,
    expenses: 1_000_000,
    profits: 500_000
}

const Balance = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="balanceContainer">
            <Navbar />
            <span className="balanceTitle">Balance</span>
            <div className="container">
                <div className="row m-5">
                    <div className="col-4 balanceDateTitle">Rango de fechas:</div>
                    <div className="datepickerContainer col-3">
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <i className="far fa-calendar calendarIcon"></i>
                    </div>
                    <div className="datepickerContainer col-3">
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                        <i className="far fa-calendar calendarIcon"></i>
                    </div>
                </div>
                <div className="row m-5">
                    <div className="col-3">
                        <div className="balanceCard">
                            Ventas: <b>{data.sales}</b>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="balanceCard">
                            Total vendido: <b>${data.total}</b>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="balanceCard">
                            Gastos: <b>${data.expenses}</b>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="balanceCard">
                            Ganancias: <b>${data.profits}</b>
                        </div>
                    </div>
                </div>
                <div className="row m-5">
                    <div className="col-4">
                        <div className="balanceCardItem">
                            <div className="imageContainer">
                                    <img className="balanceBarsImage" src={bars}/>
                                </div>
                                <div className="balanceCardLabel">Productos más vendidos</div>
                                <button type="button" className="btn btn-primary col-3 balanceCardButton">Ver detalle</button>
                            </div>
                    </div>
                    <div className="col-4">
                        <div className="balanceCardItem">
                            <div className="imageContainer">
                                    <img className="balanceBarsImage" src={productExample}/>
                                </div>
                                <div className="balanceCardLabel">Producto del día</div>
                                <button type="button" className="btn btn-primary col-3 balanceCardButton">Ver detalle</button>
                            </div>
                    </div>
                    <div className="col-4">
                        <div className="balanceCardItem">
                            <div className="imageContainer">
                                    <img className="balanceBarsImage" src={productExample}/>
                                </div>
                                <div className="balanceCardLabel">Productos agotados</div>
                                <button type="button" className="btn btn-primary col-3 balanceCardButton">Ver detalle</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Balance;
