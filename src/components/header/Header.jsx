import { Container, Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { FaCartPlus} from 'react-icons/fa';
import { VscAccount } from "react-icons/vsc";
import { CiLogout } from 'react-icons/ci'
import CountProductsItems from '../countProductsItems/CountProductsItems';
import './Header.css'
import { useState } from 'react';
import CartOffCanvas from '../cartOffCanvas/CartOffCanvas';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router';


const Header = ({isLoggedIn, setIsLoggedIn}) => {


  const {
    countProductsCart,
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity
  } = useCart;

  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  const handleCartShow = () => {
    setShowCart(true);
  }
  const handleCartClose= () => {
    setShowCart(false);
  }

  const handleUserLogout = () => {

    setIsLoggedIn(false);

    navigate('/auth/login');
  }
    


  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
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
            <CountProductsItems countProducts={countProductsCart} />
            {isLoggedIn? <Nav.Link onClick={handleUserLogout} ><CiLogout /> Cerrar</Nav.Link>  : <Nav.Link href="/auth/login"><VscAccount /> Acceder</Nav.Link>}  
          </Nav>
        </Container>
      </Navbar>
      <CartOffCanvas
        onRemoveProduct={removeFromCart}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        show={showCart}
        onHide={handleCartClose}
        items={cartItems}
      />
    </>
  )
}

export default Header