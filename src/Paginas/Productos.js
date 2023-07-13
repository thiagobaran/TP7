import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = () => {
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        const productos = res.data.products;
        setProductosOriginales(productos);
        setProductosFiltrados(productos);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const filtrarPorCategoria = () => {
    if (filtroCategoria) {
      const productosFiltrados = productosOriginales.filter(producto =>
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

      <ul>
        {productosFiltrados.map(producto => (
          <li key={producto.id}><b>{producto.title}</b></li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;
