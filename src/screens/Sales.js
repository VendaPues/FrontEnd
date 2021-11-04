import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import SalesItem from "../components/SalesItem";
import './styles/ScreensStyles.css';
import logo from "../assets/images/logo.jpg";

const Sales = () => {

    const salesData = useSelector(state => state.GeneralState.sales);
    let history = useHistory();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const goToHome = () => {
        history.push("/home");
    }

    return (
        <div className="balanceContainer">
            <img className="welcomeLogo" src={logo} onClick={goToHome} />
            <span className="balanceTitle">Ventas</span>
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
            {salesData.map((sale) => {
                return (
                    <SalesItem key={sale.id} salesItem={sale} />
                );
            })}
        </div>
    );
};

export default Sales;