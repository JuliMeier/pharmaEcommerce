import { useState, useEffect } from "react";


const initialState = {
  title: "",
  price: "",
  stock: "",
  imgUrl: "",
  categoryId: "",
  description: "",
  available: true,
};

export const ProductForm = ({ onSave, message, error, product, onCancel }) => {
  const [form, setForm] = useState(initialState);


  useEffect(() => {
    if (product) {
      setForm({
        id: product.id,
        title: product.title,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl,
        categoryId: product.categoryId,
        description: product.description,
        available: product.available,
      });
    } else {
      setForm(initialState);
    }
  }, [product]);

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
  };

  return (
    <>
      <div className="container mt-4">
        <h6>Formulario de carga de productos</h6>

        <form onSubmit={handleSubmit} className="mb-3">
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
            className="form-control mb-2"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Precio del producto"
            required
            className="form-control mb-2"
          />
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="stock del producto"
            required
            className="form-control mb-2"
          />
          <input
            name="available"
            type="checkbox"
            checked={form.available}
            onChange={(e) =>
              setForm({ ...form, available: e.target.checked })
            }
            className="form-check-input mb-2 me-2"
          />
          <label className="form-check-label mb-2 ">
            Disponible  
          </label>
          <input
            name="imgUrl"
            type="text"
            value={form.imgUrl}
            onChange={handleChange}
            placeholder="URL de la imagen"
            required
            className="form-control mb-2"
          />
          <input
            name="categoryId"
            type="number"
            value={form.categoryId}
            onChange={handleChange}
            placeholder="ID de la categoría"
            required
            className="form-control mb-2"
          />
          <textarea
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción del producto"
            required
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-success me-2">
            {product ? "Actualizar producto" : "Crear producto"}
          </button>
          {product && (
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
