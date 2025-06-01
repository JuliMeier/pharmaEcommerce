export const UsersList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="text-center">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="text-center" key={user.id}>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.roleId}</td>
              <td className="text-center">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => onEdit(user)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
