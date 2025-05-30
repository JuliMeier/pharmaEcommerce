import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    lastName: false,
    address: false,
  });

  const [showToast, setShowToast] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);
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

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: false,
    }));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: false,
    }));
  };

  const handleLastnameChange = (event) => {
    setLastName(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      lastName: false,
    }));
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      address: false,
    }));
  };

  function esEmailValido(email) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
  }

  const handleSubmit = async (event) => {
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
      valid = false;
    }

    if (password !== confirmPassword) {
      confirmPasswordRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: true,
      }));
      valid = false;
    }

    if (!name.length) {
      nameRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: true,
      }));
      valid = false;
    }

    if (!lastName.length) {
      lastNameRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: true,
      }));
      valid = false;
    }

    if (!address.length) {
      addressRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: true,
      }));
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/create-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            lastName,
            address,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al registrar usuario:", errorData);
      }

      const data = await response.json();
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/auth/login");
      }, 1500);
      console.log("Cuenta creada:", data);

      
    } catch (error) {
      console.error("Error al crear cuenta:", error);
      alert("No se pudo crear la cuenta. Intente nuevamente.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-4">
              <Form.Control
                type="text"
                className={`${errors.name ? "border border-danger" : ""}`}
                placeholder="Ingresar nombre"
                onChange={handleNameChange}
                value={name}
                ref={nameRef}
              />
              {errors.name && (
                <p className="text-danger">El nombre es obligatorio</p>
              )}
            </FormGroup>

            <FormGroup className="mb-4">
              <Form.Control
                type="text"
                className={`${errors.lastName ? "border border-danger" : ""}`}
                placeholder="Ingresar apellido"
                onChange={handleLastnameChange}
                value={lastName}
                ref={lastNameRef}
              />
              {errors.lastName && (
                <p className="text-danger">El apellido es obligatorio</p>
              )}
            </FormGroup>

            <FormGroup className="mb-4">
              <Form.Control
                type="text"
                className={`${errors.address ? "border border-danger" : ""}`}
                placeholder="Ingresar dirección"
                onChange={handleAddressChange}
                value={address}
                ref={addressRef}
              />
              {errors.address && (
                <p className="text-danger">La dirección es obligatoria</p>
              )}
            </FormGroup>

            <FormGroup className="mb-4">
              <Form.Control
                type="text"
                className={`${errors.email ? "border border-danger" : ""}`}
                placeholder="Ingresar email"
                onChange={handleEmailChange}
                value={email}
                ref={emailRef}
              />
              {errors.email && (
                <p className="text-danger">
                  Ingrese una dirección de correo válida
                </p>
              )}
            </FormGroup>

            <FormGroup className="mb-4">
              <Form.Control
                type="password"
                className={`${errors.password ? "border border-danger" : ""}`}
                placeholder="Ingresar contraseña"
                onChange={handlePasswordChange}
                value={password}
                ref={passwordRef}
              />
              {errors.password && (
                <p className="text-danger">La contraseña es obligatoria</p>
              )}
            </FormGroup>

            <FormGroup className="mb-4">
              <Form.Control
                type="password"
                className={`${
                  errors.confirmPassword ? "border border-danger" : ""
                }`}
                placeholder="Repetir contraseña"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                ref={confirmPasswordRef}
              />
              {errors.confirmPassword && (
                <p className="text-danger">Las contraseñas no coinciden</p>
              )}
            </FormGroup>

            <Row>
              <Col className="d-grid">
                <Button variant="success" type="submit">
                  Crear cuenta
                </Button>
              </Col>
            </Row>
          </Form>

          <nav>
            <Link
              to="/auth/login"
              className="text-reset d-block text-center text-decoration-none mt-2"
            >
              ¿Ya tienes una cuenta?{" "}
              <span className="fw-bold text-success">Inicia Sesión</span>
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
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg="success"
          //delay={500}
          autohide
        >
          <Toast.Body className="text-white">Cuenta creada exitosamente</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default RegisterPage;
