import React from "react";
import axios from 'axios';

const DeleteProductForm = ({product, closeAction}) => {
    const storage = window.localStorage;
    
    const deleteProduct = () => {
        let currentUser = JSON.parse(storage.getItem('user'));
        const config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${currentUser.token}` 
            }
        };
        axios.delete(`https://venda-pues-products-api-2.herokuapp.com/v1/product/${product.id}`, config)
        .then(res => {
            if (res.status === 200) {
                window.location.reload();
            } else {
                alert("Error al eliminar el producto.");
            }
        })
        .catch(err => {
            console.log(err);
            alert("ENo se pudo eliminar el producto.");
        });
    }

    return (
        <div className="container">
            <div className="delete-form-title">{"Se eliminará el producto " + product.productName + ". ¿Estás seguro?" } </div>
            <div className="delete-buttons-container">
                <button type="button" onClick={deleteProduct} className="btn btn-danger delete-form-button">Eliminar</button>
                <button type="button" onClick={closeAction} className="btn btn-secondary delete-form-button">Cancelar</button>
            </div>
        </div>
    );
};

export default DeleteProductForm;