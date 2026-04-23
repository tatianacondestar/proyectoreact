import { useState, useEffect } from 'react';

export default function Form({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    cantidad: '',
    unidad: 'kg',
    precio: ''
  });

  // 🔥 CARGAR DATOS CUANDO EDITAS
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        descripcion: initialData.descripcion || '',
        cantidad: initialData.cantidad || '',
        unidad: initialData.unidad || 'kg',
        precio: initialData.precio || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      precio: Number(formData.precio),
      cantidad: Number(formData.cantidad)
    });

    // 🔥 limpiar solo si es crear
    if (!initialData) {
      setFormData({
        nombre: '',
        descripcion: '',
        cantidad: '',
        unidad: 'kg',
        precio: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">

      <input
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />

      <input
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />

      <input
        name="cantidad"
        type="number"
        placeholder="Cantidad"
        value={formData.cantidad}
        onChange={handleChange}
      />

      <select
        name="unidad"
        value={formData.unidad}
        onChange={handleChange}
      >
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="unidades">unidades</option>
      </select>

      <input
        name="precio"
        type="number"
        placeholder="Precio"
        value={formData.precio}
        onChange={handleChange}
      />

      <button type="submit">
        {initialData ? "Actualizar" : "Guardar"}
      </button>

    </form>
  );
}