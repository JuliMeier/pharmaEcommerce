
export const OrdersList = ({orders, onDelete, onStatusChange}) => {

    const statusOptions = [
        { id: 1, status: 'Pendiente' },
        { id: 2, status: 'En Curso' },
        { id: 3, status: 'Finalizado' },
        { id: 4, status: 'Cancelado' }
    ];

    return (
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
                                <select value={order.statusId}
                                onChange={e => onStatusChange(order.id, Number(e.target.value))}
                                className="form-select form-select-sm">
                                    {statusOptions.map(opt => (
                                        <option key={opt.id} value={opt.id}>
                                            {opt.status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-danger btn-sm"
                                onClick={() => onDelete(order.id)}>
                                    Eliminar
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    )
}