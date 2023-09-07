import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito];
    const productoExistente = nuevoCarrito.find((p) => p.id === producto.id);
  
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      nuevoCarrito.push({ ...producto, cantidad: 1 });
    }
    setCarrito(nuevoCarrito);
  };

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const value = {
    carrito,
    agregarAlCarrito,
    mostrarCarrito, // Agrega mostrarCarrito al contexto
    toggleCarrito, // Agrega toggleCarrito al contexto
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser utilizado dentro de un CarritoProvider');
  }
  return context;
};
