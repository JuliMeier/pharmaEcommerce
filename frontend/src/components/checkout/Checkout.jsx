import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Checkout = () => {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { user } = useAuth();

  const [message, setMessage] = useState(null);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirm = async () => {
    
    const orderPayload = {
      userId: user.id,
      statusId: 1,
      total,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price
      })),
    };
   try {
    const response = await fetch('http://localhost:4000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload)
    });
    const data = await response.json();
    if(response.ok){
      clearCart();
      setMessage(`Compra confirmada! Tu ID de pedido es: ${data.orderId}`);
    } else {
      setMessage(data.error || 'Error al confirmar la compra');
    }
   } catch (error) {
     setMessage('Error de conexión al servidor');
   }
  };
  return (
    <div className="container mt-4">
      <h2>Tu cuenta, {user.name}</h2>
      {message && (
         <div className={`alert ${message.startsWith("Compra confirmada") ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}
      {cartItems.length === 0 ? (
        <>
          <p>No hay productos en el carrito.</p>
          <Link to="/" className="btn btn-outline-success">
            Volver a la tienda
          </Link>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-end gap-2 mb-3">
            <button className="btn btn-outline-danger" onClick={clearCart}>
              Vaciar carrito
            </button>

            <Link to="/" className="btn btn-outline-secondary">
              Volver a la tienda
            </Link>
          </div>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <span>{item.title} x </span>
                  <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={() => decrementQuantity(item.title)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => incrementQuantity(item.title)}
                  >
                    +
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-3">${item.price * item.quantity}</span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.title)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-end fw-bold">Total: ${total}</div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-primary mt-3" onClick={handleConfirm}>
              Confirmar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
