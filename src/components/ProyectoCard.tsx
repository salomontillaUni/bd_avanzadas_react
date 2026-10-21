"use client";

import { Proyecto } from "../api/proyectos";

interface ProyectoCardProps {
  proyecto: Proyecto;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView?: (id: string) => void;
}

export default function ProyectoCard({
  proyecto,
  onDelete,
  onEdit,
  onView,
}: ProyectoCardProps) {
  const id = proyecto._id || proyecto.id || "";

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px 0",
        background: "#fff",
      }}
    >
      <h3>{proyecto.titulo}</h3>
      <p>{proyecto.descripcion}</p>
      <p>
        <strong>Tipo:</strong> {proyecto.tipo_proyecto}
      </p>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {onView && (
          <button
            type="button"
            onClick={() => onView(id)}
            style={{ backgroundColor: "#28a745" }}
          >
            Ver detalle
          </button>
        )}
        <button type="button" onClick={() => onEdit(id)}>
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(id)}
          style={{ backgroundColor: "red" }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
