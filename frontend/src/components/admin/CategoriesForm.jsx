import { useState, useEffect } from "react";

const initialState = {
  title: "",
};

export const CategoriesForm = ({
  onSave,
  message,
  error,
  category,
  onCancel,
  setMessage,
  setError,
}) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (category) {
      setForm({
        id: category.id,
        title: category.title,
      });
    } else {
      setForm(initialState);
    }
  }, [category]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (setMessage) {
      setMessage(null);
    }
    if (setError) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave(form);

    setForm(initialState);
  };

  return (
    <>
      <div className="container mt-4">
        <h6>Formulario de carga de categorías</h6>

        <form onSubmit={handleSubmit} className="mb-3">
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Título de la categoría"
          />
          <button type="submit" className="btn btn-success mb-2">
            {category ? "Actualizar Categoría" : "Crear Categoría"}
          </button>
            {category && (
                <button
                type="button"
                className="btn btn-secondary mb-2 ms-2"
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
