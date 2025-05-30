import { useState, useEffect } from "react";
import { CategoriesForm } from './CategoriesForm';
import { Toast, ToastContainer } from "react-bootstrap";
import { CategoriesList } from "./CategoriesList";


export const CategoriesAdmin = () => {
    const [categories, setCategories] = useState([])
    const [editingCategory, setEditingCategory] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("http://localhost:4000/api/categories");
            const data = await response.json();
            setCategories(data);
        }
        fetchCategories();
    }
    , []);

    const handleAddOrEditCategory = async (category) => {
        setEditingCategory(null); 
        setMessage(null);
        setError(null);
        try {
            let response, data;
            if(category.id) {
                response = await fetch(`http://localhost:4000/api/categories/${category.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(category),
                });
                data = await response.json();
                if (response.ok) {
                    setCategories(prev => prev.map(item => item.id === data.id ? data : item));
                    setMessage(data.message || "Categoría actualizada correctamente");
                    setShowToast(true);
                } else {
                    setError(data.error || "Error al actualizar la categoría");
                    setShowToast(true);
                }
            } else {
                response = await fetch("http://localhost:4000/api/categories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(category),
                });
                data = await response.json();
                if (response.ok) {
                    setCategories(prev => [...prev, data]);
                    setMessage(data.message || "Categoría creada correctamente");
                    setShowToast(true);
                } else {
                    setError(data.error || "Error al crear la categoría");
                    setShowToast(true);
                }
            }
        } catch (error) {
            setError("Error de conexión al servidor");  
            setShowToast(true);
        }
    }

    const handleDeleteCategory = async (id) => {
        setEditingCategory(null);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(`http://localhost:4000/api/categories/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                setCategories(prev => prev.filter(item => item.id !== id));
                setMessage(data.message || "Categoría eliminada correctamente");
                setShowToast(true);
            } else {
                setError(data.error || "Error al eliminar la categoría");
                setShowToast(true);
            }
        } catch (error) {
            setError("Error de conexión al servidor");
            setShowToast(true);
        }
    }

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setMessage(null);
        setError(null);
    }

    const handleCancelEdit = () => {
        setEditingCategory(null);
        setMessage(null);
        setError(null);
    }

    
    return (
        <>
            <h5 className="text-center">Administración de Categorias</h5>
            <CategoriesForm
                onSave={handleAddOrEditCategory}
                message={message}
                error={error}
                category={editingCategory}
                onCancel={handleCancelEdit} 
                setMessage={setMessage}
                setError={setError}  
            />
            <CategoriesList 
            categories={categories} 
            onDelete={handleDeleteCategory} 
            onEdit={handleEditCategory} />
          
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
                    delay={2500}
                    autohide
                    bg={error ? "danger" : "success"}
                >
                    <Toast.Body>
                        {error ? error : message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}