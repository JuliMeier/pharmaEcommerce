import { Offcanvas } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";

const CartOffCanvas = ({ show, onHide, items, onRemoveProduct }) => {
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
                <strong>{item.quantity}</strong>
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
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartOffCanvas;
