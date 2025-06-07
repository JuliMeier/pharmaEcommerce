import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/orders/history/${user.id}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error al cargar historial:", error);
      }
    };

    fetchOrders();
  }, [user.id]);

  return (
    <div className="container mt-5">
      <h2>Pedidos realizados</h2>
      {orders.length === 0 ? (
        <p>Aun no tenes pedidos realizados</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.OrderStatus?.status}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;



