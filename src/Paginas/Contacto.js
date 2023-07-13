import React, { useState } from 'react';

const Contacto = () => {
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    // Aquí puedes agregar la lógica de envío del formulario o realizar cualquier acción adicional
  };

  return (
    <div>
      <h1>Contacto</h1>
      {isFormSubmitted ? (
        <div>
          <p>Gracias por enviar el formulario. Nos pondremos en contacto contigo pronto.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formValues.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="message">Mensaje:</label>
            <textarea id="message" name="message" rows="4" value={formValues.message} onChange={handleChange}></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
}

export default Contacto;
