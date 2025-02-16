import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dispositivos from "../../data/dispositivos.json";
import "./DetallesDispositivo.css";

const DetallesDispositivo = ({ isLoggedIn, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null); // Estado para el comentario en edición

  useEffect(() => {
    const dispositivo = dispositivos.find((d) => d.disp_id === parseInt(id));
    if (dispositivo) {
      setDevice(dispositivo);
      setComentarios(dispositivo.comentarios || []);
    } else {
      navigate("/"); // Redirigir a la página de inicio si no se encuentra el dispositivo
    }
  }, [id, navigate]);

  const handleComentarioSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para agregar un comentario.");
      return;
    }

    if (editingCommentId) {
      // Editar comentario existente
      const updatedComentarios = comentarios.map((comentario) =>
        comentario.id === editingCommentId
          ? { ...comentario, comentario: comentario }
          : comentario
      );
      setComentarios(updatedComentarios);

      // Actualizar el archivo JSON (simulado)
      const dispositivoIndex = dispositivos.findIndex((d) => d.disp_id === parseInt(id));
      dispositivos[dispositivoIndex].comentarios = updatedComentarios;

      setEditingCommentId(null); // Salir del modo de edición
    } else {
      // Agregar nuevo comentario
      const nuevoComentario = {
        id: comentarios.length + 1,
        usuario: user.usuario,
        comentario: comentario,
      };

      const nuevosComentarios = [...comentarios, nuevoComentario];
      setComentarios(nuevosComentarios);

      // Actualizar el archivo JSON (simulado)
      const dispositivoIndex = dispositivos.findIndex((d) => d.disp_id === parseInt(id));
      dispositivos[dispositivoIndex].comentarios = nuevosComentarios;
    }

    setComentario(""); // Limpiar el campo de comentario
  };

  const handleEditComment = (commentId) => {
    const commentToEdit = comentarios.find((comentario) => comentario.id === commentId);
    if (commentToEdit) {
      setComentario(commentToEdit.comentario);
      setEditingCommentId(commentId);
    }
  };

  const handleDeleteComment = (commentId) => {
    if (
      !isLoggedIn ||
      (!user.tipo_usuario === "administrador" &&
        comentarios.find((comentario) => comentario.id === commentId).usuario !== user.usuario)
    ) {
      alert("No tienes permiso para eliminar este comentario.");
      return;
    }

    const updatedComentarios = comentarios.filter((comentario) => comentario.id !== commentId);
    setComentarios(updatedComentarios);

    // Actualizar el archivo JSON (simulado)
    const dispositivoIndex = dispositivos.findIndex((d) => d.disp_id === parseInt(id));
    dispositivos[dispositivoIndex].comentarios = updatedComentarios;
  };

  if (!device) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalles-container">
      <h1 className="modelo">{device.modelo}</h1>

      <div className="detalles-content">
        <img src={device.imagen} alt={device.modelo} className="imagen-dispositivo" />

        <div className="caracteristicas">
          <h2>Características</h2>
          <p>
            <strong>Marca:</strong> {device.marca}
          </p>
          <p>
            <strong>Año:</strong> {device.año}
          </p>
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
          <p>
            <strong>Colores:</strong> {device.color.join(", ")}
          </p>
        </div>
      </div>

      <div className="comentarios-section">
        <h2>Comentarios</h2>
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="comentario">
            <strong>{comentario.usuario}:</strong> {comentario.comentario}
            {(user?.usuario === comentario.usuario || user?.tipo_usuario === "administrador") && (
              <div className="comentario-actions">
                <button onClick={() => handleEditComment(comentario.id)}>Editar</button>
                <button onClick={() => handleDeleteComment(comentario.id)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}

        {isLoggedIn && (
          <form onSubmit={handleComentarioSubmit} className="comentario-form">
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escribe tu comentario..."
              required
            />
            <button type="submit">
              {editingCommentId ? "Guardar Cambios" : "Agregar Comentario"}
            </button>
            {editingCommentId && (
              <button type="button" onClick={() => setEditingCommentId(null)}>
                Cancelar Edición
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default DetallesDispositivo;