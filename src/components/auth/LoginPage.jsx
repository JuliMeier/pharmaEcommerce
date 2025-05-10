import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: false,
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: false,
    }));
  };

  function esEmailValido(email) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;

    if (!email.length || !esEmailValido(email)) {
      emailRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true,
      }));
      return;
    }

    if (!password.length) {
      passwordRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
      }));
      return;
    }

    navigate("");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-4">
              <Form.Control
                type="text"
                className={`${
                  errors.email ? "border border-danger" : ""
                }`}
                placeholder="Ingresar email"
                onChange={handleEmailChange}
                value={email}
                ref={emailRef}
              />
              {errors.email && (
                <p className="text-danger">Ingrese una dirección de correo válida</p>
              )}
            </FormGroup>
            <FormGroup className="mb-4">
              <Form.Control
                type="password"
                placeholder="Ingresar contraseña"
                className={`${
                  errors.password ? "border border-danger" : ""
                }`}
                onChange={handlePasswordChange}
                value={password}
                ref={passwordRef}
              />
            </FormGroup>
            <Row>
              <Col className="d-grid">
                <Button  variant="success" type="submit">
                  Iniciar sesión
                </Button>
              </Col>
            </Row>
          </Form>

          <nav>
            <Link
              to="/auth/register"
              className="text-reset d-block text-center text-decoration-none mt-2"
            >
              ¿No tienes una cuenta? Registrate
            </Link>
            <Link
              to="/"
              className="text-reset d-block text-center text-decoration-none mt-2"
            >
              Volver a la tienda
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
