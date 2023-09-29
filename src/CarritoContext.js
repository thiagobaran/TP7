import React, { createContext, useContext, useEffect, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    console.log('Cargando carrito desde localStorage');
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      console.log('Carrito recuperado:', JSON.parse(carritoGuardado));
      setCarrito(JSON.parse(carritoGuardado));
    } else {
      console.log('No se encontraron datos de carrito en localStorage');
    }
  }, []);
  
  // En el useEffect para guardar el carrito en localStorage
  useEffect(() => {
    console.log('Guardando carrito en localStorage:', carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

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

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== productoId);
    setCarrito(nuevoCarrito);
  };

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    mostrarCarrito,
    toggleCarrito,
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
