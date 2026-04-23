export default function List({ hortalizas, onDelete, onEdit }) {
  return (
    <div className="list-container">
      <h2>Hortalizas</h2>

      {hortalizas.length === 0 ? (
        <p>No hay hortalizas</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {hortalizas.map(h => (
              <tr key={h._id}>
                <td>{h.nombre}</td>
                <td>{h.descripcion}</td>
                <td>{h.cantidad}</td>
                <td>{h.unidad}</td>
                <td>S/. {Number(h.precio || 0).toFixed(2)}</td>

                <td>
                  <button onClick={() => onEdit(h)}>
                    Editar
                  </button>

                  <button onClick={() => onDelete(h._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}