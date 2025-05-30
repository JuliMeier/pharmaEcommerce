import { Link } from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Checkout = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Tu cuenta, {user.name}</h2>
      

      {cartItems.length === 0 ? (
        <>
        <p>No hay productos en el carrito.</p>
        <Link to='/' className='btn btn-outline-success'>Volver a la tienda</Link>
        </>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.title} x {item.quantity}
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-end fw-bold">
            Total: ${total}
          </div>
          <button className="btn btn-primary mt-3">Confirmar compra</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
