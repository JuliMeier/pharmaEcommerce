import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom'

const ShopLayout = () => {
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
            <Nav.Link href="/">Tienda</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default ShopLayout