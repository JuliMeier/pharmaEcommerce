import { useState } from "react";

export const OrdersList = ({ orders, onDelete, onStatusChange }) => {
  const statusOptions = [
    { id: 1, status: "Pendiente" },
    { id: 2, status: "En Curso" },
    { id: 3, status: "Finalizado" },
    { id: 4, status: "Cancelado" },
  ];

  const [statusOrder, setStatusOrder] = useState({});

  const handleSelectChange = (orderId, value) => {
    setStatusOrder((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  return orders.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.total.toFixed(2)}</td>
              <td>
                <select
                  value={statusOrder[order.id] || order.statusId}
                  onChange={(e) =>
                    handleSelectChange(order.id, Number(e.target.value))
                  }
                  className="form-select form-select-sm"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.status}
                    </option>
                  ))}
                </select>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="d-flex gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    onStatusChange(
                      order.id,
                      statusOrder[order.id] ?? order.statusId
                    )
                  }
                  disabled={
                    (statusOrder[order.id] ?? order.statusId) === order.statusId
                  }
                >
                  Confirmar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (
                      window.confirm("¿Estás seguro de eliminar esta orden?")
                    ) {
                      onDelete(order.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="alert alert-info text-center">
      No hay órdenes disponibles.
    </div>
  );
};
