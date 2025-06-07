

export const ProductList = ({ products,  onDelete, onEdit}) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="text-center">
                    <tr>
                        <th>Imagén</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src={product.imgUrl}
                                    alt={product.title}
                                    className="img-fluid"
                                    style={{ width: "100px", height: "auto" }}
                                />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>{product.categoryId} </td>
                            <td>{product.stock}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={()=> onEdit(product)} >Editar</button>
                                <button className="btn btn-danger" onClick={() => {
                                    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
                                        onDelete(product.id);
                                    }
                                }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}