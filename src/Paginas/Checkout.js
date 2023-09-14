import React, { useState } from 'react';
import { Alert, Modal } from 'react-bootstrap';

const Checkout = () => {
  const [datosFacturacion, setDatosFacturacion] = useState({});
  const [datosEnvio, setDatosEnvio] = useState({});
  const [datosPago, setDatosPago] = useState({});

  const handleDatosFacturacionChange = (e) => {
    const { name, value } = e.target;
    setDatosFacturacion({ ...datosFacturacion, [name]: value });
  };

  const handleDatosEnvioChange = (e) => {
    const { name, value } = e.target;
    setDatosEnvio({ ...datosEnvio, [name]: value });
  };

  const handleDatosPagoChange = (e) => {
    const { name, value } = e.target;
    setDatosPago({ ...datosPago, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <h3>Datos de Facturación</h3>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={datosFacturacion.nombre || ''}
          onChange={handleDatosFacturacionChange}
          required
        />
        <h3>Datos de Envío</h3>
        <input
          type="text"
          name="direccion"
          placeholder="Dirección de Envío"
          value={datosEnvio.direccion || ''}
          onChange={handleDatosEnvioChange}
          required
        />
        <h3>Datos de Pago</h3>
        <input
          type="text"
          name="tarjeta"
          placeholder="Número de Tarjeta"
          value={datosPago.tarjeta || ''}
          onChange={handleDatosPagoChange}
          required
        />
        
        <button type="submit">Finalizar Compra</button>
        
      </form>
    </div>
  );
};

export default Checkout;
