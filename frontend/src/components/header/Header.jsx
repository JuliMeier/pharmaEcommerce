import { Container, Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import CountProductsItems from "../countProductsItems/CountProductsItems";
import "./Header.css";
import { useState } from "react";
import CartOffCanvas from "../cartOffCanvas/CartOffCanvas";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router";

const Header = () => {
  const { user, logout } = useAuth();

  const {
    countProductsCart,
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCart();

  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  const handleCartShow = () => {
    setShowCart(true);
  };
  const handleCartClose = () => {
    setShowCart(false);
  };

  // const handleUserLogout = () => {

  //   localStorage.removeItem('token');

  //   setIsLoggedIn(false);
  //   clearCart();
  //   navigate('/auth/login');
  // }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src="/logo-pharma.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <span className="fw-bold text-success">PharmaShopping</span>
          </Navbar.Brand>
          <Nav className="ms-auto nav-bar">
            <Nav.Link as={Link} to="/">
              Tienda
            </Nav.Link>
            {user && (user.role === "admin" || user.role === "superadmin") && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
            {( !user || user.role === "client") && ( 
            <Nav.Link onClick={handleCartShow} className="cart-link position-relative ">
              {" "}
              <FaCartPlus /> Carrito
               <CountProductsItems countProducts={countProductsCart} />
            </Nav.Link>
            )}

           
            {user && user.role === "client" && (
              <>
                <Nav.Link as={Link} to="/history">
                  {" "}
                  Mis pedidos
                </Nav.Link>
              </>
            )}
            {user ? (
              <Nav.Link onClick={logout}>
                <CiLogout /> Cerrar
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/auth/login">
                <VscAccount /> Acceder
              </Nav.Link>
            )}
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
  );
};

export default Header;
