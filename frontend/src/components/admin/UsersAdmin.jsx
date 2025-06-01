import { useState, useEffect} from 'react';
import { UsersList } from './UsersList';
import { UsersForm } from './UsersForm';

export const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/users')
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
                    },
                    body: JSON.stringify(user),
                });
                data = await response.json();
                if (response.ok) {
                    setUsers(prev => prev.map(user => user.id === data.user.id ? data.user : user));
                    setMessage(data.message || "Usuario actualizado correctamente");
                } else {
                    setError(data.error || "Error al actualizar el usuario");
                }
            } else {
                response = await fetch("http://localhost:4000/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });
                data = await response.json();
                if (response.ok) {
                    setUsers(prev => [...prev, data.user]);
                    setMessage(data.message || "Usuario creado correctamente");
                } else {
                    setError(data.error || "Error al crear el usuario");
                }
            }
        } catch (error) {
            setError("Error de conexión al servidor");
        }
        setEditingUser(null);
    }

    const handleDeleteUser = async (id) => {
        setMessage(null);
        setError(null);
        try {
            const response = await fetch(`http://localhost:4000/api/users/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(prev => prev.filter(user => user.id !== id));
                setMessage(data.message || "Usuario eliminado correctamente");
            } else {
                setError(data.error || "Error al eliminar el usuario");
            }
        } catch (error) {
            setError("Error de conexión al servidor");
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
        />
        <UsersList 
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        />
        </>
    )
}