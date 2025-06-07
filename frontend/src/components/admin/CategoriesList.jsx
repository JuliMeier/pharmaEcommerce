export const CategoriesList = ({ categories, onDelete, onEdit}) => {
  
  return categories.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="text-center">
          <tr className="text-center">
            <th>Titulo Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="text-center">{category.title}</td>
              <td className="text-center">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => onEdit(category)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
                      onDelete(category.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="alert alert-info text-center">
      No hay categorías disponibles.
    </div>
  );
};
