import { useState} from 'react';
import Form from '../components/Form';
import List from '../components/List';
import api from '../services/api';

export default function Home() {
  const [hortalizas, setHortalizas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHortaliza = async (formData) => {
    try {
      const nuevaHortaliza = await api.crearHortaliza(formData);
      setHortalizas([...hortalizas, nuevaHortaliza]);
      setError(null);
    } catch (err) {
      setError('Error al crear la hortaliza');
      console.error(err);
    }
  };

  const handleDeleteHortaliza = async (id) => {
    try {
      await api.eliminarHortaliza(id);
      setHortalizas(hortalizas.filter(h => h.id !== id));
      setError(null);
    } catch (err) {
      setError('Error al eliminar la hortaliza');
      console.error(err);
    }
  };

  const handleEditHortaliza = async (hortaliza) => {
    // Implementar lógica de edición
    console.log('Editar:', hortaliza);
  };

  return (
    <div className="home">
      <h1>Gestión de Hortalizas</h1>
      {error && <div className="error-message">{error}</div>}
      {loading && <p>Cargando...</p>}
      
      <Form onSubmit={handleAddHortaliza} />
      
      <List 
        hortalizas={hortalizas}
        onDelete={handleDeleteHortaliza}
        onEdit={handleEditHortaliza}
      />
    </div>
  );
}
