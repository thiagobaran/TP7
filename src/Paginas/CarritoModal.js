import React from "react";
import { useCarrito } from "../CarritoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"; // Importa PropTypes
import { Link } from "react-router-dom"; // Agrega esta importación

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useCarrito();

  const handleEliminarDelCarrito = (productoId) => {
    eliminarDelCarrito(productoId);
  };

  const calcularPrecioConDescuento = (precio, descuento) => {
    const precioConDescuento = precio - precio * (descuento / 100);
    return precioConDescuento.toFixed(2);
  };

  const calcularPrecioTotalProducto = (producto) => {
    const cantidad = producto.cantidad || 1;
    const precioTotal =
      parseFloat(
        calcularPrecioConDescuento(producto.price, producto.discountPercentage)
      ) * cantidad;
    return precioTotal.toFixed(2);
  };

  const calcularPrecioTotal = () => {
    let total = 0;
    carrito.forEach((producto) => {
      total += parseFloat(calcularPrecioTotalProducto(producto));
    });
    return total.toFixed(2);
  };


  return (
    <div className="carrito-modal">
      <div className="modal-content">
        <h1>Carrito</h1>
        <div className="carritoProductos">
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <div
              className="carritoTableContainer"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <table className="carritoTable">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((producto) => (
                    <tr key={producto.id}>
                      <td>
                        <img
                          src={producto.images[0]}
                          alt=""
                          style={{ height: "130px", width: "auto" }}
                        />
                      </td>
                      <td>{producto.title}</td>
                      <td>
                        $
                        {calcularPrecioConDescuento(
                          producto.price,
                          producto.discountPercentage
                        )}
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="eliminarIcon"
                          onClick={() => handleEliminarDelCarrito(producto.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="resumenCompra">
          <h2>Resumen de Compra</h2>
          <p>Subtotal: ${calcularPrecioTotal()}</p>
          {/* Agrega un enlace a la página de checkout */}
          <Link to="/checkout">
            <button>Ir a pagar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Carrito.propTypes = {
  eliminarDelCarrito: PropTypes.func.isRequired,
  carrito: PropTypes.array.isRequired,
};

export default Carrito;
