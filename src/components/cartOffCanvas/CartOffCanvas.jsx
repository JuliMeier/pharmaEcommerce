import { Offcanvas } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";

const CartOffCanvas = ({ show, onHide, items, onRemoveProduct, onIncrement, onDecrement }) => {
  return (
    <div>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Mi Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {items.length === 0 ? (
            <h3 className="text-secondary">Tu carrito esta vacio</h3>
          ) : (
            items.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={()=> onDecrement(item.title)}
                  >-</button>
                <strong>{item.quantity}</strong>
                <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={()=> onIncrement(item.title)}
                >+</button>
                {item.title} -
                <div className="d-flex justify-content-center"><strong>${item.price}</strong></div>                
                </div>                
                <button
                  className="btn btn-danger btn-md"
                  onClick={() => onRemoveProduct(item.title) }
                >
                  <MdDeleteForever />
                </button>
              </li>

            ))
          )}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h5 className="text-muted">Total:</h5>
            <h5>${items.reduce((total, item) => total + item.price * item.quantity, 0)}</h5>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartOffCanvas;
