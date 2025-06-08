import { Container, Row, Col } from "react-bootstrap";



export const Footer = () => (
  <footer className="bg-dark text-light mt-5 py-4 " >
    <Container>
      <Row>
        <Col md={4} className="mb-3 mb-md-0">
          <h5 className="fw-bold text-success">PharmaShopping</h5>
          <p className="mb-0" style={{ fontSize: "0.95rem" }}>
            Tu farmacia online de confianza. Productos de calidad y atención personalizada.
          </p>
        </Col>
        <Col md={4} className="mb-3 mb-md-0">
          <h6>Enlaces útiles</h6>
          <ul className="list-unstyled">
            <li><a href="/" className="text-light text-decoration-none">Inicio</a></li>
            <li><a href="/auth/login" className="text-light text-decoration-none">Acceder</a></li>
            <li><a href="/auth/register" className="text-light text-decoration-none">Registrarse</a></li>
          </ul>
        </Col>
        <Col md={4}>
          <h6>Contacto</h6>
          <p className="mb-1" style={{ fontSize: "0.95rem" }}>
            Email: contacto@pharmashopping.com
          </p>
          <p className="mb-0" style={{ fontSize: "0.95rem" }}>
            Tel: +54 11 1234-5678
          </p>
        </Col>
      </Row>
      <hr className="bg-light" />
      <Row>
        <Col className="text-center" style={{ fontSize: "0.9rem" }}>
          &copy; {new Date().getFullYear()} PharmaShopping. Todos los derechos reservados.
        </Col>
      </Row>
    </Container>
  </footer>
);

