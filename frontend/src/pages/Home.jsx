import { useState, useEffect } from 'react';
import Form from '../components/Form';
import List from '../components/List';
import api from '../services/api';

export default function Home() {
  const [hortalizas, setHortalizas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null); //  NUEVO

  // Se ejecuta automáticamente cuando el componente se carga
// para traer los datos sin necesidad de refrescar la página
  useEffect(() => {
    fetchHortalizas();
  }, []);

  const fetchHortalizas = async () => {
    setLoading(true);
    try {
      const data = await api.obtenerHortalizas();
      setHortalizas(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las hortalizas');
    } finally {
      setLoading(false);
    }
  };

  // 🔥 CREAR Y EDITAR EN UNO
  const handleAddHortaliza = async (formData) => {
    try {
      if (editando) {
        // ✏️ EDITAR
        await api.actualizarHortaliza(editando._id, formData);

        setHortalizas(
          hortalizas.map(h =>
            h._id === editando._id ? { ...h, ...formData } : h
          )
        );

        setEditando(null);
      } else {
        // ➕ CREAR
        const nueva = await api.crearHortaliza(formData);
        setHortalizas([...hortalizas, nueva]);
      }

      setShowModal(false);
    } catch (err) {
      setError('Error al guardar');
    }
  };

  // 🗑️ ELIMINAR
  const handleDeleteHortaliza = async (id) => {
    try {
      await api.eliminarHortaliza(id);
      setHortalizas(hortalizas.filter(h => h._id !== id));
    } catch (err) {
      setError('Error al eliminar');
    }
  };

  // ✏️ EDITAR (abre modal)
  const handleEditHortaliza = (item) => {
    setEditando(item);
    setShowModal(true);
  };

  return (
    <div className="home">
      <h1>Gestión de Hortalizas</h1>

      {error && <div className="error-message">{error}</div>}
      {loading && <p>Cargando...</p>}

      {/* BOTÓN */}
      <button onClick={() => {
        setEditando(null);
        setShowModal(true);
      }}>
        Crear Hortaliza
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {editando ? 'Editar Hortaliza' : 'Nueva Hortaliza'}
            </h2>

            <Form 
              onSubmit={handleAddHortaliza}
              initialData={editando}
            />

            <button onClick={() => {
              setShowModal(false);
              setEditando(null);
            }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* LISTA */}
      <List
        hortalizas={hortalizas}
        onDelete={handleDeleteHortaliza}
        onEdit={handleEditHortaliza}
      />
    </div>
  );
}