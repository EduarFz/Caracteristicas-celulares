import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
import logo from "../../assets/logo.png";

const Banner = ({ onFilterClick, isLoggedIn, user, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="banner">
      {/* Botón de Inicio con Link */}
      <Link to="/" className="banner-button">
        Inicio
      </Link>

      {/* Logo centrado */}
      <img src={logo} alt="Logo de la página" className="banner-logo" />

      {/* Botones de Filtros y Login/Usuario */}
      <div className="banner-right">
        <button className="banner-button" onClick={onFilterClick}>
          Filtros
        </button>

        {isLoggedIn ? (
          <div className="user-menu">
            <button className="banner-button" onClick={toggleMenu}>
              {user.usuario}
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                {user.tipo_usuario === "administrador" && (
                  <Link to="/administracion" className="menu-item">
                    Administración
                  </Link>
                )}
                <Link to="/perfil" className="menu-item">
                  Perfil
                </Link>
                <button className="menu-item" onClick={onLogout}>
                  Salir
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="banner-button">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Banner;