import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup } from "react-bootstrap";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errors, setErrors] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    const updatedErrors = {
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    };

    if (!oldPassword.length) {
      updatedErrors.oldPassword = true;
      oldPasswordRef.current.focus();
      valid = false;
    }

    if (!newPassword.length) {
      updatedErrors.newPassword = true;
      if (valid) newPasswordRef.current.focus();
      valid = false;
    }

    if (newPassword !== confirmNewPassword) {
      updatedErrors.confirmNewPassword = true;
      if (valid) confirmNewPasswordRef.current.focus();
      valid = false;
    }

    setErrors(updatedErrors);
    if (!valid) return;

    try {
      const res = await fetch(`http://localhost:4000/api/users/${user.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "Contraseña actual incorrecta") {
          setErrors({ ...updatedErrors, oldPassword: true });
          oldPasswordRef.current.focus();
          return;
        }
        alert(data.error || "Error al cambiar la contraseña");
        return;
      }

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1500);

      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              className={`${errors.oldPassword ? "border border-danger" : ""}`}
              placeholder="Contraseña actual"
              onChange={(e) => {
                setOldPassword(e.target.value);
                setErrors((prev) => ({ ...prev, oldPassword: false }));
              }}
              value={oldPassword}
              ref={oldPasswordRef}
            />
            {errors.oldPassword && (
              <p className="text-danger">Debe ingresar su contraseña actual</p>
            )}
          </FormGroup>

          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              className={`${errors.newPassword ? "border border-danger" : ""}`}
              placeholder="Nueva contraseña"
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrors((prev) => ({ ...prev, newPassword: false }));
              }}
              value={newPassword}
              ref={newPasswordRef}
            />
            {errors.newPassword && (
              <p className="text-danger">Debe ingresar una nueva contraseña</p>
            )}
          </FormGroup>

          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              className={`${
                errors.confirmNewPassword ? "border border-danger" : ""
              }`}
              placeholder="Confirmar nueva contraseña"
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmNewPassword: false }));
              }}
              value={confirmNewPassword}
              ref={confirmNewPasswordRef}
            />
            {errors.confirmNewPassword && (
              <p className="text-danger">Las contraseñas no coinciden</p>
            )}
          </FormGroup>

          <Button variant="success" type="submit" className="w-100">
            Cambiar contraseña
          </Button>
        </Form>

        <nav className="mt-3 text-center">
          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="fw-bold text-success"
          >
            Volver a la tienda
          </Button>
        </nav>

        {showToast && (
          <div className="toast-container position-fixed top-0 end-0 p-3">
            <div className="toast show bg-success text-white" role="alert">
              <div className="toast-body">Contraseña actualizada con éxito</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
