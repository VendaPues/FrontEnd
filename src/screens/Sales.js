import React, { useState, useEffect, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg";
import SalesItem from "../components/SalesItem";
import Navbar from "../components/Navbar";
import DateFilterForm from "../components/DateFilterForm";
import "./styles/ScreensStyles.css";
import axios from "axios";

const Sales = () => {
  const storage = window.localStorage;

  const [salesData, setSalesData] = useState([]);

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
        `https://venda-pues-sales-api.herokuapp.com/v1/sale/${currentUser.userId}`,
        config
      )
      .then((res) => {
        setSalesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <Navbar />
      <div className="container">
        <span className="balance-title">Ventas</span>
        <DateFilterForm
          currentStartDate={startDate}
          setStartDateAction={setStartDate}
          currentEndDate={endDate}
          setEndDateAction={setEndDate}
        />
        <Suspense
          fallback={
            <img src={logo} className="App-logo" alt="" width="100px" />
          }
        >
          {salesData.map((sale) => {
            return <SalesItem key={sale.id} salesItem={sale} />;
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default Sales;
