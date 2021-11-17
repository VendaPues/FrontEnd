import React, { useState, Suspense, lazy } from "react";
import logo from "../assets/svg/logo.svg";
import SalesItem from "../components/SalesItem";
import Navbar from "../components/Navbar";
import DateFilterForm from "../components/DateFilterForm";
import "./styles/ScreensStyles.css";

const Sales = () => {
  const salesData = [
    {
      id: 123,
      name: "Venta #534",
      total: 1000,
      units: 13,
    },
    {
      id: 456,
      name: "Venta #533",
      total: 2000,
      units: 7,
    },
  ];

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
