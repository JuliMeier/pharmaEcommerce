import { Offcanvas } from "react-bootstrap"


const CartOffCanvas = ({show, onHide}) => {
  return (
    <div>
        <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>

    </div>
  )
}

export default CartOffCanvas