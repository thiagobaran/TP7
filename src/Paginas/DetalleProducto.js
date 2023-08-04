import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './DetalleProducto.css'; 

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProducto(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const { title, images, description, price, discountPercentage, rating, stock, brand, category } = producto;

  return (
    <div className="detalle-producto">
      <div className="producto-info">
        <h1>{title}</h1>
        <p>Descripción: {description}</p>
        <p>{price}$</p>
        <p>{discountPercentage}% DE DESCUENTO</p>
        <p>Rating: {rating}</p>
        <p>Quedan {stock} unidades</p>
        <p>Marca: {brand}</p>
        <p>Categoría: {category}</p>
      </div>
      <div className="producto-carrousel">
        <Carousel>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image} alt={`Imagen ${index + 1}`} className="d-block w-100" />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DetalleProducto;
