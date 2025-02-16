import React, { useState } from "react";
import Card from "../Card/Card";
import "./CardList.css";

const CardList = ({ devices }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const devicesPerPage = 9;
  const devicesPerRow = 3;

  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);

  const rows = [];
  for (let i = 0; i < currentDevices.length; i += devicesPerRow) {
    rows.push(currentDevices.slice(i, i + devicesPerRow));
  }

  const nextPage = () => {
    if (currentPage < Math.ceil(devices.length / devicesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="card-list">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="card-row">
          {row.map((device) => (
            <Card key={device.disp_id} device={device} />
          ))}
        </div>
      ))}

      <div className="pagination">
        {currentPage > 1 && (
          <button className="pagination-button" onClick={prevPage}>
            Atrás
          </button>
        )}
        {currentPage < Math.ceil(devices.length / devicesPerPage) && (
          <button className="pagination-button" onClick={nextPage}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default CardList;