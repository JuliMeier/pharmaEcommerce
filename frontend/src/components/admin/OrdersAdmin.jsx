import { useState, useEffect } from "react";
import { OrdersList } from './OrdersList';

export const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/api/orders')
        .then(res => res.json())
        .then(data => setOrders(data))
    }, []); 

    const handleDelete = async (id) => {
        setMessage(null)
        setError(null)
        try {
            const response = await fetch(`http://localhost:4000/api/orders/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                setOrders(prev => prev.filter(order => order.id !== id));
                setMessage(data.message || "Orden eliminada correctamente");
                setShowToast(true);
            } else {
                setError(data.error || "Error al eliminar la orden");
                setShowToast(true);
            }
        } catch (error) {
            setError("Error de conexión al servidor");
            setShowToast(true);
        }
    
    }

    const handleStatusChange = async (id, statusId) => {
        setMessage(null);
        setError(null);
        try {
            const response = await fetch(`http://localhost:4000/api/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ statusId }),
            });
            const data = await response.json();
            if (response.ok) {
                setOrders(prev => prev.map(order => order.id === id ? { ...order, statusId } : order));
                setMessage(data.message || "Estado de la orden actualizado correctamente");
                setShowToast(true);
            } else {
                setError(data.error || "Error al actualizar el estado de la orden");
                setShowToast(true);
            }
        } catch (error) {
            setError("Error de conexión al servidor");
            setShowToast(true);
        }
    }





    return (
        <>
        <h5 className="text-center">Administración de Órdenes</h5>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <OrdersList 
        orders={orders} 
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        />
        </>
    );
}