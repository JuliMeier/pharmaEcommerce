import { useState, useEffect } from "react";
import { ProductList } from "./ProductList";
import { ProductForm } from "./ProductForm";
import { Toast, ToastContainer } from "react-bootstrap";

export const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:4000/api/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    };
    fetchData();
  }, []);

  const handleAddOrEdit = async (product) => {
    setMessage(null);
    setError(null);

    try {
      let response, data;
      if (product.id) {
        response = await fetch(
          `http://localhost:4000/api/products/${product.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        data = await response.json();
        if (response.ok) {
          setProducts((prev) =>
            prev.map((item) => (item.id === data.id ? data : item))
          );
          setMessage(data.message || "Producto actualizado correctamente");
          setShowToast(true);
        } else {
          setError(data.error || "Error al actualizar el producto");
          setShowToast(true);
        }
      } else {
        response = await fetch("http://localhost:4000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
        data = await response.json();
        if (response.ok) {
          setProducts((prev) => [...prev, data]);
          setMessage(data.message || "Producto creado correctamente");
          setShowToast(true);
        } else {
          setError(data.error || "Error al crear el producto");
          setShowToast(true);
        }
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  const handleDelete = async (id) => {
    setMessage(null);
    setError(null);
  
    fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setProducts((prev) => prev.filter((item) => item.id !== id));
          setMessage("Producto eliminado correctamente");
          setShowToast(true);
        } else {
          setError("Error al eliminar el producto");
          setShowToast(true);
        }
      })
      .catch((error) => {
        setError("Error de conexión con el servidor");
      });
  };

   const handleEditProduct = (product) => {
        setEditingProduct(product);
        setMessage(null);
        setError(null);
    }

    const handleCancelEditProduct = () => {
        setEditingProduct(null);
        setMessage(null);
        setError(null);
    }


  return (
    <>
      <h5 className="text-center">Administración de Productos</h5>
      <ProductForm
        onSave={handleAddOrEdit}
        product={editingProduct}
        onCancel={handleCancelEditProduct}
        message={message}
        error={error}
      />
      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDelete}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
          bg={error ? "danger" : "success"}
          delay={2500}
          autohide
          
        >
          <Toast.Body className="text-white">
            {error ? error : message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
