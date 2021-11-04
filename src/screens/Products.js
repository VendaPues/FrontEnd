import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import './styles/ScreensStyles.css';
import logo from "../assets/images/logo.jpg";
import axios from 'axios';

const Products = () => {

    const [productsData, setProductsData] = useState([]);
    let history = useHistory();
    const storage = window.localStorage;

    useEffect(() => {
        let currentUser = JSON.parse(storage.getItem('user'));
        const config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${currentUser.token}` 
            }
        };
        axios.get(`https://venda-pues-products-api-2.herokuapp.com/v1/product/${currentUser.userId}`, config)
        .then(res => {
            console.log(res);
            setProductsData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const goToHome = () => {
        history.push("/home");
    }

    const goToCreateProduct = () => {
        history.push("/create-product");
    }

    return (
        <div className="balanceContainer">
            <img className="welcomeLogo" src={logo} onClick={goToHome} />
            <span className="balanceTitle">Productos</span>
            <div className="row productsSearchSection">
                <div className="inputProductsContainer col-8">
                    <div className="input-group col-8 mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-search"></i>
                        </span>
                        <input type="text" className="form-control" placeholder="" aria-label="Producto" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <button type="button" onClick={goToCreateProduct} className="btn btn-primary col-3 createProductButton">Añadir nuevo producto</button>
            </div>
            
            {productsData.map((product) => {
                return (
                    <ProductItem key={product.id} productItem={product} />
                );
            })}
        </div>
    );
};

export default Products;