export default function List({ hortalizas, onDelete, onEdit }) {
  return (
    <div className="list-container">
      <h2>Hortalizas</h2>
      {hortalizas.length === 0 ? (
        <p>No hay hortalizas registradas</p>
      ) : (
        <table className="hortalizas-table">
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
            {hortalizas.map(hortaliza => (
              <tr key={hortaliza.id}>
                <td>{hortaliza.nombre}</td>
                <td>{hortaliza.descripcion}</td>
                <td>{hortaliza.cantidad}</td>
                <td>{hortaliza.unidad}</td>
                <td>${hortaliza.precio.toFixed(2)}</td>
                <td className="actions">
                  <button 
                    onClick={() => onEdit(hortaliza)}
                    className="btn-edit"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onDelete(hortaliza.id)}
                    className="btn-delete"
                  >
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
