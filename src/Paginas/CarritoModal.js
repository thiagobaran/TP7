import React from "react";
import { useCarrito } from "../CarritoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"; // Importa PropTypes

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useCarrito();

  const handleEliminarDelCarrito = (productoId) => {
    eliminarDelCarrito(productoId);
  };

  const calcularPrecioConDescuento = (precio, descuento) => {
    const precioConDescuento = precio - precio * (descuento / 100);
    return precioConDescuento.toFixed(2); // Redondear a 2 decimales
  };

  const calcularPrecioTotal = () => {
    let total = 0;
    carrito.forEach((producto) => {
      total += parseFloat(
        calcularPrecioConDescuento(
          producto.price,
          producto.discountPercentage
        )
      );
    });
    return total.toFixed(2);
  };

  return (
    <div className="carrito-modal">
      <div className="modal-content">
        <h1>Carrito</h1>
        <div className="carrito-productos">
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <table className="carrito-table">
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
                        className="eliminar-icon"
                        onClick={() => handleEliminarDelCarrito(producto.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="carrito-resumen">
          <h2>Resumen de Compra</h2>
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>${calcularPrecioTotal()}</span>
          </div>
          <button className="finalizar-compra">Finalizar Compra</button>
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
