import React from "react";
import dispositivos from "../../data/dispositivos.json";
import usuarios from "../../data/usuarios.json";
import "./Administracion.css";

const Administracion = () => {
  const totalDispositivos = dispositivos.length;
  const totalUsuarios = usuarios.length;

  return (
    <div className="administracion-container">
      <h1>Panel de Administración</h1>

      <div className="estadisticas">
        <div className="estadistica">
          <h2>Dispositivos</h2>
          <p>Total: {totalDispositivos}</p>
        </div>

        <div className="estadistica">
          <h2>Usuarios Registrados</h2>
          <p>Total: {totalUsuarios}</p>
        </div>
      </div>
    </div>
  );
};

export default Administracion;