import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import CardList from "./components/CardList/CardList";
import Filters from "./components/Filters/Filters";
import Login from "./components/Login/Login";
import DetallesDispositivo from "./components/DetallesDispositivo/DetallesDispositivo";
import Administracion from "./components/Administracion/Administracion";
import Perfil from "./components/Perfil/Perfil";
import "./index.css";
import devices from "./data/dispositivos.json";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredDevices, setFilteredDevices] = useState(devices);

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleLogin = (usuario) => {
    setIsLoggedIn(true);
    setUser(usuario);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const applyFilters = (filteredDevices) => {
    setFilteredDevices(filteredDevices);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilteredDevices(devices);
  };

  return (
    <Router>
      <Banner
        onFilterClick={handleFilterClick}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {showFilters && (
                <Filters
                  devices={devices}
                  onApplyFilters={applyFilters}
                  onResetFilters={resetFilters}
                />
              )}
              <CardList devices={filteredDevices} />
            </>
          }
        />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/dispositivo/:id"
          element={<DetallesDispositivo isLoggedIn={isLoggedIn} user={user} />}
        />

        <Route
          path="/administracion"
          element={
            isLoggedIn && user.tipo_usuario === "administrador" ? (
              <Administracion />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/perfil"
          element={
            isLoggedIn ? (
              <Perfil user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;