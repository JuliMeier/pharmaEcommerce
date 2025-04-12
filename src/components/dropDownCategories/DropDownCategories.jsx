import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './DropDownCategories.css'

const DropDownCategories = () => {
  return (
    <>
      <Navbar variant="light" bg="light" expand="lg"className='dropdown-menu'     >
        <Container fluid >
          <Navbar.Toggle aria-controls="navbar-light-example"  />
          <Navbar.Collapse id="navbar-light-example">
            <Nav >
              <NavDropdown
                id="nav-dropdown-light-example"
                title="Categorias "
                menuVariant="light" 
                          
              >
                <NavDropdown.Item href="#action/3.1">Cuidado Personal</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Cuidados Generales
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Maquillaje
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Perfume
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5">
                  Accesorios
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.6">
                  Mundo bebé
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.7">
                  Regaleria
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default DropDownCategories;
