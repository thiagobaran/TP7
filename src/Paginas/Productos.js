// Productos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCarrito } from '../CarritoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Productos = () => {
  const { carrito } = useCarrito();
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    axios
      .get('https://dummyjson.com/products')
      .then((res) => {
        const productos = res.data.products;
        setProductosOriginales(productos);
        setProductosFiltrados(productos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtrarPorCategoria = () => {
    if (filtroCategoria) {
      const productosFiltrados = productosOriginales.filter((producto) =>
        producto.category.toLowerCase().includes(filtroCategoria.toLowerCase())
      );
      setProductosFiltrados(productosFiltrados);
    } else {
      setProductosFiltrados(productosOriginales);
    }
  };

  return (
    <div>
      <h1>Productos</h1>

      <input
        type="text"
        placeholder="Ingrese una categoría"
        value={filtroCategoria}
        onChange={(e) => setFiltroCategoria(e.target.value)}
      />
      <button onClick={filtrarPorCategoria}>Filtrar</button>

      <ul className="productos-lista">
        {productosFiltrados.map((producto) => (
          <li key={producto.id}>
            {productoEnCarrito(carrito, producto.id) && (
              <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            )}
            <Link to={`/productos/${producto.id}`}>
              <b>{producto.title}</b>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
