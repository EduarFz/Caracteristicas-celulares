import React from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

const Perfil = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate("/login"); // Redirigir al login si no hay usuario logueado
    return null;
  }

  return (
    <div className="perfil-container">
      <h1>Perfil de Usuario</h1>

      <div className="perfil-info">
        <div className="info-item">
          <strong>Nombre de Usuario:</strong> {user.usuario}
        </div>
        <div className="info-item">
          <strong>Correo Electrónico:</strong> {user.correo}
        </div>
        <div className="info-item">
          <strong>Tipo de Usuario:</strong> {user.tipo_usuario}
        </div>
      </div>
    </div>
  );
};

export default Perfil;