import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProducto(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const { title, images, description, price, discountPercentage, rating, stock, brand, category } = producto;

  return (
    <div>
      <h1>Detalle del producto: {title}</h1>
      <h2>Imágenes:</h2>
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Imagen ${index + 1}`} />
        ))}
      </div>
      <h2>Información:</h2>
      <p>Descripción: {description}</p>
      <p>Precio: {price}</p>
      <p>Porcentaje de descuento: {discountPercentage}</p>
      <p>Rating: {rating}</p>
      <p>Stock: {stock}</p>
      <p>Marca: {brand}</p>
      <p>Categoría: {category}</p>
    </div>
  );
}

export default DetalleProducto;
