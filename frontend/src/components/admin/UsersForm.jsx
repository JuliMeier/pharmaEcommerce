import { useEffect, useState } from "react";

  const initialState = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client", 
  };

export const UsersForm = ({onSave, message, error, user, onCancel}) => {
    const [form, setForm] = useState(initialState);

    useEffect(() => {
    if (user) {
        setForm({
            ...initialState,
            ...user,
            password: "",
            confirmPassword: "",
        });
    } else {
        setForm(initialState);
    }
}, [user]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(form);
        setForm(initialState);
    }


  return (
    <>
      <div className="container mt-4">
        <h6 className="mb-3">{user ? 'Editar Usuario': 'Crear usuario'} </h6>
        <form onSubmit={handleSubmit} className="mb-3" >
          <input
            name="name"
            type="text"
            value={form.name}
            className="form-control mb-2"
            required
            onChange={handleChange}
            placeholder="Nombre de usuario"
          />
          <input
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Apellido de usuario"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Correo electrónico"
          />
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Contraseña"
            />
            <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Confirmar contraseña"
            /> 
            <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-control mb-2"
            >
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
            </select>
            <button type='submit' className="btn btn-success me-2">
            {user ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
            {user && (
                <button type='button' className="btn btn-secondary" onClick={onCancel}>
                Cancelar
                </button>
            )}
        </form>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};
