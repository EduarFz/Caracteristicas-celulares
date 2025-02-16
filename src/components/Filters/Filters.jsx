import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ devices, onApplyFilters, onResetFilters }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedRAM, setSelectedRAM] = useState([]);

  const brands = [...new Set(devices.map((device) => device.marca))];
  const storageOptions = ["128GB", "256GB", "512GB", "1TB"];
  const ramOptions = ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB", "20GB"];

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleStorageChange = (storage) => {
    setSelectedStorage((prev) =>
      prev.includes(storage)
        ? prev.filter((s) => s !== storage)
        : [...prev, storage]
    );
  };

  const handleRAMChange = (ram) => {
    setSelectedRAM((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]
    );
  };

  const applyFilters = () => {
    const filteredDevices = devices.filter((device) => {
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(device.marca);
      const matchesStorage =
        selectedStorage.length === 0 ||
        selectedStorage.some((s) => device.almacenamiento.includes(s));
      const matchesRAM =
        selectedRAM.length === 0 ||
        selectedRAM.some((ram) => device.memoria_ram.includes(ram.replace("GB", " GB")));
      return matchesBrand && matchesStorage && matchesRAM;
    });

    if (filteredDevices.length === 0) {
      alert("No hay dispositivos que coincidan con los filtros seleccionados. Por favor, elija otras opciones.");
    } else {
      onApplyFilters(filteredDevices);
    }
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedStorage([]);
    setSelectedRAM([]);
    onResetFilters();
  };

  return (
    <div className="filters-container">
      <h3>Filtros</h3>

      {/* Filtro de Marca */}
      <div className="filter-group">
        <h4>Marca:</h4>
        {brands.map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Filtro de Almacenamiento */}
      <div className="filter-group">
        <h4>Almacenamiento:</h4>
        {storageOptions.map((storage) => (
          <label key={storage}>
            <input
              type="checkbox"
              checked={selectedStorage.includes(storage)}
              onChange={() => handleStorageChange(storage)}
            />
            {storage}
          </label>
        ))}
      </div>

      {/* Filtro de RAM */}
      <div className="filter-group">
        <h4>RAM:</h4>
        {ramOptions.map((ram) => (
          <label key={ram}>
            <input
              type="checkbox"
              checked={selectedRAM.includes(ram)}
              onChange={() => handleRAMChange(ram)}
            />
            {ram}
          </label>
        ))}
      </div>

      {/* Botones para aplicar y quitar filtros */}
      <div className="filter-group">
        <button className="apply-button" onClick={applyFilters}>
          Aplicar Filtros
        </button>
        <button className="reset-button" onClick={resetFilters}>
          Quitar Filtros
        </button>
      </div>
    </div>
  );
};

export default Filters;