import { useEffect, useState } from "react";

const initialState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  roleId: 1,
};

export const UsersForm = ({
  onSave,
  message,
  error,
  user,
  onCancel,
  setMessage,
  setError,
  setShowToast,
}) => {
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

    if (!form.name.trim()) {
      setError("El nombre de usuario no puede estar vacío");
      setShowToast(true);
      return;
    }
    if (!form.lastName.trim()) {
      setError("El apellido no puede estar vacío");
      setShowToast(true);
      return;
    }
    if (!form.email.trim()) {
      setError("El correo electrónico no puede estar vacío");
      setShowToast(true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("El correo electrónico no es válido");
      setShowToast(true);
      return;
    }
    if (!user || form.password || form.confirmPassword) {
      if (!form.password) {
        setError("La contraseña no puede estar vacía");
        setShowToast(true);
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Las contraseñas no coinciden");
        setShowToast(true);
        return;
      }
      if (form.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        setShowToast(true);
        return;
      }
    }
    await onSave(form);
    setForm(initialState);
  };

  return (
    <>
      <div className="container mt-4">
        <h6 className="mb-3">{user ? "Editar Usuario" : "Crear usuario"} </h6>
        <form onSubmit={handleSubmit} className="mb-3">
          <label className="my-2"> Nombre de usuario <span className="text-danger fw-bold">*</span></label>
          <input
            name="name"
            type="text"
            value={form.name}
            className="form-control mb-2"
            required
            onChange={handleChange}
            placeholder=""
          />
          <label className="my-2"> Apellido de usuario <span className="text-danger fw-bold">*</span></label>
          <input
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder=""
          />
          <label className="my-2"> Correo electrónico <span className="text-danger fw-bold">*</span></label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder=""
          />
          <label className="my-2"> Contraseña <span className="text-danger fw-bold">*</span></label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder=""
          />
          <label className="my-2"> Confirmar contraseña <span className="text-danger fw-bold">*</span></label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder=""
          />
          <label className="my-2"> Rol de usuario <span className="text-danger fw-bold">*</span></label>
          <select
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
            className="form-control mb-2"
          >
            <option value={1}>Cliente</option>
            <option value={2}>Administrador</option>
          </select>
          <button type="submit" className="btn btn-success me-2">
            {user ? "Actualizar Usuario" : "Crear Usuario"}
          </button>
          {user && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
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
