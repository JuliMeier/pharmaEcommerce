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

export const ProductForm = ({ onSave, message, error, product, onCancel, setError, setMessage, setShowToast }) => {
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

    if(form.price <= 0 ) {
      setError('El precio debe ser mayor a 0')
      setShowToast(true)
      return
    }
    if (form.stock < 0) {
      setError("El stock no puede ser negativo");
      setShowToast(true);
      return;
    }
      if (!/^https?:\/\/.+\..+/.test(form.imgUrl)) {
      setError("La URL de la imagen no es válida");
      setShowToast(true);
      return;
    }

        if (!form.description.trim()) {
      setError("La descripción no puede estar vacía");
      setShowToast(true);
      return;
    }
    if (!form.categoryId || form.categoryId <= 0) {
      setError("El ID de la categoría debe ser un número positivo");
      setShowToast(true);
      return;
    }

    await onSave(form);

    setForm(initialState);

  };

  return (
    <>
      <div className="container mt-4">
        <h6>Formulario de carga de productos</h6>

        <form onSubmit={handleSubmit} className="mb-6">
          <label className="my-2 "><i>Nombre del producto </i><span className="text-danger fw-bold">*</span></label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder=""
            required
            className="form-control mb-2"
          />
          <label className="my-2 "><i>Precio del producto </i> <span className="text-danger fw-bold">*</span></label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder=""
            required
            className="form-control mb-2"
          />
          <label className="my-2 "><i>Stock del producto </i><span className="text-danger fw-bold">*</span></label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder=""
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
            <i>Disponible</i>  
          </label>
          <label className="my-2 d-block "><i>URL de la imagen</i> <span className="text-danger fw-bold">*</span></label>
          <input
            name="imgUrl"
            type="text"
            value={form.imgUrl}
            onChange={handleChange}
            placeholder=""
            required
            className="form-control mb-2"
          />
          <label className="my-2 "><i>ID de la categoría</i> <span className="text-danger fw-bold">*</span></label>
          <input
            name="categoryId"
            type="number"
            value={form.categoryId}
            onChange={handleChange}
            placeholder=""
            required
            className="form-control mb-2"
          />
          <label className="my-2"><i>Descripción del producto</i> <span className="text-danger fw-bold">*</span></label>
          <textarea
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder=""
            required
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-success me-2 mt-2 mb-4">
            {product ? "Actualizar producto" : "Crear producto"}
          </button>
          {product && (
            <button
              type="button"
              className="btn btn-secondary mt-2 mb-4"
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
