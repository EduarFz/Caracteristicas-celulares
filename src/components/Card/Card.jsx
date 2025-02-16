import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ device }) => {
  return (
    <div className="card">
      <img src={device.imagen} alt={device.modelo} className="card-image" />
      <h2 className="card-title">
        {device.marca} {device.modelo}
      </h2>
      <div className="card-details">
        <p>
          <strong>Pantalla:</strong> {device.tamaño_pantalla}
        </p>
        <p>
          <strong>Batería:</strong> {device.bateria}
        </p>
        <p>
          <strong>Almacenamiento:</strong> {device.almacenamiento}
        </p>
        <p>
          <strong>RAM:</strong> {device.memoria_ram}
        </p>
      </div>
      <Link to={`/dispositivo/${device.disp_id}`} className="card-button">
        Ver más detalles
      </Link>
    </div>
  );
};

export default Card;