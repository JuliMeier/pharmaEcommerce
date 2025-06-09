import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { Offcanvas, Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate} from 'react-router-dom'

const CartOffCanvas = ({ show, onHide}) => {

  const{cartItems, 
    removeFromCart, 
    incrementQuantity,
    decrementQuantity } = useCart();
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleBuyClick = () => {
    if(user){
      navigate('/checkout');
    } else {
      navigate('/auth/login');
    }
  }

  return (
    <div>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Mi Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <h3 className="text-secondary">Tu carrito esta vacio</h3>
          ) : (
            cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <button 
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={()=> decrementQuantity(item.id)}
                  >-</button>
                <strong>{item.quantity}</strong>
                <button 
                className="btn btn-outline-secondary btn-sm ms-2 me-2"
                onClick={()=> incrementQuantity(item.id)}
                >+</button>
                {item.title} -
                <div className="d-flex justify-content-center"><strong>${item.price}</strong></div>                
                </div>                
                <button
                  className="btn btn-danger btn-md"
                  onClick={() => removeFromCart(item.id) }
                >
                  <MdDeleteForever />
                </button>
              </li>

            ))
          )}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h5 className="text-muted">Total:</h5>
            <h5>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h5>
          </div>
          { cartItems.length > 0 && <div className="mt-3">
            <Button size="lg" className="w-100" variant="success" onClick={handleBuyClick}>Comprar</Button>
          </div>   }
                 
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartOffCanvas;
