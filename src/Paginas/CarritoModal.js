// Carrito.js
import React from 'react';
import { useCarrito } from '../CarritoContext';

const Carrito = () => {
  const { carrito } = useCarrito();

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <ul>
        {carrito.map((producto) => (
          <li key={producto.id}>
            <span>{producto.title}</span> {/* Cambia 'producto.nombre' por 'producto.title' */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carrito;
