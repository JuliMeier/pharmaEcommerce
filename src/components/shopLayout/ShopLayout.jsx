import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom'

const ShopLayout = () => {
  return (
    <>
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand><Link to="/" className="text-decoration-none"> 
            <img
              alt=""
              src="/logo-pharma.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {" "} <span className='fw-bold text-success'>PharmaShopping</span></Link>
          </Navbar.Brand>
          <Nav className="ms-auto nav-bar">
            <Nav.Link ><Link to="/" className="text-decoration-none text-success">Tienda</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default ShopLayout