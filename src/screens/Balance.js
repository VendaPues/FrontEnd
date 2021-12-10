import React, { useState, useEffect, Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
import logo from "../assets/svg/logo.svg";
import {
  LineChart,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Bar,
  Legend,
} from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/ScreensStyles.css";
import DateFilterForm from "../components/DateFilterForm";
import axios from "axios";

const ProductItemInfoCard = lazy(() =>
  import("../components/ProductItemInfoCard")
);

const lineGraphData = [
  { date: "Lun", ventas: 30 },
  { date: "Mar", ventas: 21 },
  { date: "Mie", ventas: 25 },
  { date: "Jue", ventas: 40 },
  { date: "Vie", ventas: 50 },
  { date: "Sab", ventas: 100 },
  { date: "Dom", ventas: 20 },
];

const barGraphData = [
  {product: "Gansito", ventas: 5},
  {product: "Chocorramo", ventas: 10},
  {product: "Arroz Roa", ventas: 3},
  {product: "Coca-Cola", ventas: 4}
]

const Balance = () => {
  const storage = window.localStorage;

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  const [salesStats, setSalesStats] = useState({});

  const [soldOutProducts, setSoldOutProducts] = useState([]);

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
        `https://venda-pues-report-api.herokuapp.com/v1/report/${currentUser.userId}/sales`,
        config
      )
      .then((res) => {
        setSalesStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
        `https://venda-pues-report-api.herokuapp.com/v1/report/${currentUser.userId}/sold-out`,
        config
      )
      .then((res) => {
        setSoldOutProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <Navbar />
      <div className="container">
        <span className="balance-title">Reporte</span>
        <DateFilterForm
          currentStartDate={startDate}
          setStartDateAction={setStartDate}
          currentEndDate={endDate}
          setEndDateAction={setEndDate}
        />
        <div className="balance-graph-section-container row">
          <span className="balance-subtitle">Gráficos</span>
          <div className="col graph-container">
            <span className="graph-title">Ventas durante la última semana</span>
            <LineChart
              width={500}
              height={300}
              data={lineGraphData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis dataKey="ventas" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line
                type="monotone"
                dataKey="ventas"
                stroke="#ff7300"
                yAxisId={0}
              />
              <Legend />
            </LineChart>
          </div>

          <div className="col graph-container">
            <span className="graph-title">Ventas por producto</span>
            <BarChart
              width={500}
              height={300}
              data={barGraphData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis dataKey="ventas"/>
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
        <div className="balance-section-container">
          <span className="balance-subtitle">Resumen de ventas</span>
          <div className="row m-5">
            <div className="card balance-card">
              <div className="card-body">
                Ventas: <b>{salesStats.totalSales}</b>
              </div>
            </div>
            <div className="card balance-card">
              <div className="card-body">
                Total vendido:{" "}
                <b>{formatter.format(salesStats.totalSaleAmount)}</b>
              </div>
            </div>
            <div className="card balance-card">
              <div className="card-body">
                Costos: <b>{formatter.format(salesStats.totalProductsCost)}</b>
              </div>
            </div>
            <div className="card balance-card">
              <div className="card-body">
                Ganancias: <b>{formatter.format(salesStats.earnings)}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="balance-section-container">
          <span className="balance-subtitle">Productos agotados</span>
          <div className="container">
            <Suspense
              fallback={
                <img src={logo} className="App-logo" alt="" width="100px" />
              }
            >
              {soldOutProducts.map((product) => {
                if (product) {
                  return (
                    <ProductItemInfoCard
                      key={product.id}
                      productItem={product}
                    />
                  );
                }
                return null;
              })}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
