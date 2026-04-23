const API_BASE_URL = 'http://backend-service-tatiana:5000/api/hortalizas';

const api = {
  // 🔹 Obtener todas
  obtenerHortalizas: async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Error al obtener hortalizas');
    return response.json();
  },

  // 🔹 Obtener una
  obtenerHortaliza: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Error al obtener hortaliza');
    return response.json();
  },

  // 🔹 Crear
  crearHortaliza: async (datos) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    if (!response.ok) throw new Error('Error al crear hortaliza');
    return response.json();
  },

  // 🔹 Actualizar
  actualizarHortaliza: async (id, datos) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    if (!response.ok) throw new Error('Error al actualizar hortaliza');
    return response.json();
  },

  // 🔹 Eliminar
  eliminarHortaliza: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar hortaliza');
    return response.json();
  }
};

export default api;