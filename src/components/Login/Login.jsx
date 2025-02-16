import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de verificación de credenciales
    const usuarios = [
      {
        correo: "eefs93@hotmail.com",
        contrasena: "12345678",
        usuario: "EduarFz",
        tipo_usuario: "administrador",
      },
      {
        correo: "ana.gomez@example.com",
        contrasena: "ana2024",
        usuario: "AnaG",
        tipo_usuario: "normal",
      },
    ];

    const usuario = usuarios.find(
      (user) => user.correo === email && user.contrasena === password
    );

    if (usuario) {
      onLogin(usuario);
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>

      <div className="login-links">
        <Link to="/recuperar-contraseña">¿Olvidaste tu contraseña?</Link>
        <Link to="/registrarse">Registrarse</Link>
      </div>

      {/* Tarjeta con información de usuarios de prueba */}
      <div className="usuarios-prueba">
        <h3>Usuarios de Prueba</h3>
        <div className="usuario-info">
          <p>
            <strong>Administrador:</strong>
          </p>
          <p>Correo: <strong>eefs93@hotmail.com</strong></p>
          <p>Contraseña: <strong>12345678</strong></p>
        </div>
        <div className="usuario-info">
          <p>
            <strong>Usuario Normal:</strong>
          </p>
          <p>Correo: <strong>ana.gomez@example.com</strong></p>
          <p>Contraseña: <strong>ana2024</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Login;