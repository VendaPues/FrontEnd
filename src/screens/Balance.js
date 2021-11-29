import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
} from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/ScreensStyles.css";
import bars from "../assets/images/bars.jpg";
import productExample from "../assets/images/productExample.jpg";
import DateFilterForm from "../components/DateFilterForm";

const data = {
  sales: 100,
  total: 1_500_000,
  expenses: 1_000_000,
  profits: 500_000,
};

const theData = [
  { date: "Lunes", ventas: 10 },
  { date: "Martes", ventas: 20 },
  { date: "Miercoles", ventas: 30 },
  { date: "Jueves", ventas: 40 },
  { date: "Viernes", ventas: 50 },
  { date: "Sabado", ventas: 60 },
  { date: "Domingo", ventas: 70 },
];

const Balance = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <Navbar />
      <div className="container">
        <span className="balance-title">Balance</span>
        <DateFilterForm
          currentStartDate={startDate}
          setStartDateAction={setStartDate}
          currentEndDate={endDate}
          setEndDateAction={setEndDate}
        />
        <LineChart
          width={600}
          height={400}
          data={theData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis dataKey="ventas" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="ventas" stroke="#ff7300" yAxisId={0} />
          <Legend />
        </LineChart>
        <div className="row m-5">
          <div className="card balance-card">
            <div className="card-body">
              Ventas: <b>{data.sales}</b>
            </div>
          </div>
          <div className="card balance-card">
            <div className="card-body">
              Total vendido: <b>${data.total}</b>
            </div>
          </div>
          <div className="card balance-card">
            <div className="card-body">
              Gastos: <b>${data.expenses}</b>
            </div>
          </div>
          <div className="card balance-card">
            <div className="card-body">
              Ganancias: <b>${data.profits}</b>
            </div>
          </div>
        </div>
        <div className="row m-5">
          <div className="col-4">
            <div className="balanceCardItem">
              <div className="imageContainer">
                <img className="balanceBarsImage" alt="" src={bars} />
              </div>
              <div className="balanceCardLabel">Productos más vendidos</div>
              <button
                type="button"
                className="btn btn-primary col-3 balanceCardButton"
              >
                Ver detalle
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="balanceCardItem">
              <div className="imageContainer">
                <img className="balanceBarsImage" alt="" src={productExample} />
              </div>
              <div className="balanceCardLabel">Producto del día</div>
              <button
                type="button"
                className="btn btn-primary col-3 balanceCardButton"
              >
                Ver detalle
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="balanceCardItem">
              <div className="imageContainer">
                <img className="balanceBarsImage" alt="" src={productExample} />
              </div>
              <div className="balanceCardLabel">Productos agotados</div>
              <button
                type="button"
                className="btn btn-primary col-3 balanceCardButton"
              >
                Ver detalle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
