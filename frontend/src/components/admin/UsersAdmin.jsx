import { useState, useEffect} from 'react';
import { UsersList } from './UsersList';
import { UsersForm } from './UsersForm';
import { Toast, ToastContainer } from "react-bootstrap";

export const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch('http://localhost:4000/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const handleAddOrEditUser = async (user) => {
        setEditingUser(null);
        setMessage(null);
        setError(null);
        try {
            let response, data;
            if (user.id) {
                response = await fetch(`http://localhost:4000/api/users/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(user),
                });
                data = await response.json();
                if (response.ok) {
                    setUsers(prev => prev.map(user => user.id === data.user.id ? data.user : user));
                    setMessage(data.message || "Usuario actualizado correctamente");
                    setShowToast(true)
                } else {
                    setError(data.error || "Error al actualizar el usuario");
                    setShowToast(true)
                }
            } else {
                response = await fetch("http://localhost:4000/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(user),
                });
                data = await response.json();
                if (response.ok) {
                    setUsers(prev => [...prev, data.user]);
                    setMessage(data.message || "Usuario creado correctamente");
                    setShowToast(true)
                } else {
                    setError(data.error || "Error al crear el usuario");
                    setShowToast(true)
                }
            }
        } catch (error) {
            setError("Error de conexión al servidor");
            setShowToast(true)
        }
        setEditingUser(null);
    }

    const handleDeleteUser = async (id) => {
        setMessage(null);
        setError(null);
        try {
            const response = await fetch(`http://localhost:4000/api/users/${id}`, {
                method: "DELETE",
                 headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                 },
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(prev => prev.filter(user => user.id !== id));
                setMessage(data.message || "Usuario eliminado correctamente");
                setShowToast(true)
            } else {
                setError(data.error || "Error al eliminar el usuario");
                setShowToast(true)
            }
        } catch (error) {
            setError("Error de conexión al servidor");
            setShowToast(true)
        }
    }

    const handleEditUser = (user) => {
        setEditingUser(user);
        setMessage(null);
        setError(null);
    }

    const handleCancelEdit = () => {
        setEditingUser(null);
        setMessage(null);
        setError(null);
    }



    return (
        <>
        <h5 className="text-center">Administración de Usuarios</h5>
        <UsersForm
        onSave={handleAddOrEditUser}
        message={message}
        error={error}
        user={editingUser}
        onCancel={handleCancelEdit}
        setMessage={setMessage}
        setError={setError}
        setShowToast={setShowToast}
        />
        <UsersList 
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        />
          <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => {
         setShowToast(false);
         setMessage(null);
         setError(null);
          }} 
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
    )
}