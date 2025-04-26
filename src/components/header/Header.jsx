import { Container, Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { FaCartPlus} from 'react-icons/fa';
import { VscAccount } from "react-icons/vsc";
import CountProductsItems from '../countProductsItems/CountProductsItems';
import './Header.css'
import { useState } from 'react';
import CartOffCanvas from '../cartOffCanvas/CartOffCanvas';


const Header = ({countProducts, items, onRemoveProduct, onIncrement, onDecrement}) => {

  const [showCart, setShowCart] = useState(false);

  const handleCartShow = () => {
    setShowCart(true);
  }
  const handleCartClose= () => {
    setShowCart(false);
  }


  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo-pharma.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {" "} <span className='fw-bold text-success'>PharmaShopping</span>
          </Navbar.Brand>
          <Nav className="ms-auto nav-bar">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart" onClick={handleCartShow}> <FaCartPlus /> Carrito</Nav.Link>
            <CountProductsItems countProducts={countProducts} />
            <Nav.Link href="/auth/login"><VscAccount /> Acceder</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <CartOffCanvas
        onRemoveProduct={onRemoveProduct}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        show={showCart}
        onHide={handleCartClose}
        items={items}
      />
    </>
  )
}

export default Header