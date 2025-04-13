import { Container, Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { FaCartPlus} from 'react-icons/fa';
import { VscAccount } from "react-icons/vsc";
import CountProductsItems from '../countProductsItems/CountProductsItems';
import './Header.css'


const Header = ({countProducts}) => {
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
            <Nav.Link href="#cart"> <FaCartPlus /> Carrito</Nav.Link>
            <CountProductsItems countProducts={countProducts} />
            <Nav.Link href="#access"><VscAccount /> Acceder</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header