const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  // Obtener todas las hortalizas
  obtenerHortalizas: async () => {
    const response = await fetch(`${}/hortalizas`);
    if (!response.ok) throw new Error('Error al obtener hortalizas');
    return response.json();
  },

  // Obtener una hortaliza por ID
  obtenerHortaliza: async (id) => {
    const response = await fetch(`${}/hortalizas/${id}`);
    if (!response.ok) throw new Error('Error al obtener hortaliza');
    return response.json();
  },

  // Crear una nueva hortaliza
  crearHortaliza: async (datos) => {
    const response = await fetch(`${API_BASE_URL}/hortalizas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    if (!response.ok) throw new Error('Error al crear hortaliza');
    return response.json();
  },

  // Actualizar una hortaliza
  actualizarHortaliza: async (id, datos) => {
    const response = await fetch(`${API_BASE_URL}/hortalizas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    if (!response.ok) throw new Error('Error al actualizar hortaliza');
    return response.json();
  },

  // Eliminar una hortaliza
  eliminarHortaliza: async (id) => {
    const response = await fetch(`${API_BASE_URL}/hortalizas/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar hortaliza');
    return response.json();
  }
};

export default api;
