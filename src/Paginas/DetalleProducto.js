import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './DetalleProducto.css';
import { useCarrito } from '../CarritoContext';
import PropTypes from 'prop-types';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProducto(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito({ ...producto }); // Agrega la cantidad al producto
    }
  };

  return (
    <div className="detalle-producto">
      <div className="producto-info">
        <h1>{producto?.title}</h1>
        <p>Descripción: {producto?.description}</p>
        <p>{producto?.price}$</p>
        <p>{producto?.discountPercentage}% DE DESCUENTO</p>
        <p>Rating: {producto?.rating}</p>
        <p>Quedan {producto?.stock} unidades</p>
        <p>Marca: {producto?.brand}</p>
        <p>Categoría: {producto?.category}</p>
        <button onClick={handleAgregarAlCarrito}>Añadir al Carrito</button>
      </div>
      <div className="producto-carrousel">
        <Carousel>
          {producto?.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image} alt={`Imagen ${index + 1}`} className="d-block w-100" />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

DetalleProducto.propTypes = {
  agregarAlCarrito: PropTypes.func.isRequired,
};

export default DetalleProducto;
