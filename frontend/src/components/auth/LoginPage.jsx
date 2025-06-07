import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";

const LoginPage = () => {
  const {login} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [ errorMessage, setErrorMessage ] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

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

    

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        if(response.status === 404) {
          setErrorMessage('Usuario no encontrado');
        } else if(response.status === 401) {
          setErrorMessage('Contraseña incorrecta');
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Error en la autenticación');
        }
         
        return;
      }

      const data = await response.json();
      

      localStorage.setItem('token', data.token);
      login(data.user);
      if(data.user.role === 'admin' || data.user.role === 'superadmin') {
        navigate("/admin");
      } else {
        navigate("/checkout");
      }
    } catch (error) {
      setErrorMessage('Error en la conexión con el servidor');
    }

    
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div>
          <Form onSubmit={handleSubmit}>
            {errorMessage && (
              <p className="text-danger text-center">{errorMessage}</p>
            )}
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
              ¿No tienes una cuenta? <span className="fw-bold text-success">Registrate</span>
            </Link>
            <Link
              to="/"
              className="text-reset d-block text-center text-decoration-none mt-2"
            >
              <span className="fw-bold text-success">Volver a la tienda</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
