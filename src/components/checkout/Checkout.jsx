import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Resumen de tu compra</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
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
