import { useState } from 'react';

export default function Form({ onSubmit }) {
  const [formData, setFormData] =({
    nombre: '',
    descripcion: '',
    cantidad: '',
    unidad: 'kg',
    precio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      nombre: '',
      descripcion: '',
      cantidad: '',
      unidad: 'kg',
      precio: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="unidad">Unidad:</label>
        <select
          id="unidad"
          name="unidad"
          value={formData.unidad}
          onChange={handleChange}
        >
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="unidades">unidades</option>
          <option value="litros">litros</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          step="0.01"
        />
      </div>

      <button type="submit">Agregar Hortaliza</button>
    </form>
  );
}
