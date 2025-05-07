// src/components/CheckoutForm.jsx
import React, { useState } from "react";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("¡Gracias por tu compra!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h5>Datos del comprador</h5>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input type="text" name="direccion" className="form-control" value={formData.direccion} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-success w-100">Finalizar compra</button>
    </form>
  );
};

export default CheckoutForm;
