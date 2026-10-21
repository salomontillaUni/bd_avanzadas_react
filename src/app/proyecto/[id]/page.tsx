"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { obtenerProyectoPorId, eliminarProyecto, Proyecto } from "../../../api/proyectos";

export default function DetalleProyectoPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    obtenerProyectoPorId(id)
      .then((res) => {
        setProyecto(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al obtener detalle del proyecto:", err);
        setError("No se pudo cargar el proyecto.");
      })
      .finally(() => setCargando(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const confirmacion = window.confirm("¿Seguro que deseas eliminar este proyecto?");
    if (!confirmacion) return;

    try {
      await eliminarProyecto(id);
      router.push("/proyectos");
    } catch (err) {
      console.error("Error al eliminar proyecto:", err);
      alert("Hubo un error al intentar eliminar.");
    }
  };

  if (cargando) return <p className="container" style={{ marginTop: "20px" }}>Cargando detalle...</p>;
  if (error || !proyecto) {
    return (
      <main className="container" style={{ marginTop: "20px" }}>
        <p style={{ color: "red" }}>{error || "Proyecto no encontrado."}</p>
        <button type="button" onClick={() => router.push("/proyectos")}>
          Volver a Proyectos
        </button>
      </main>
    );
  }

  return (
    <main className="container" style={{ marginTop: "20px" }}>
      <h2>Detalle del Proyecto</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginTop: "15px",
          background: "#fff",
        }}
      >
        <h3>{proyecto.titulo}</h3>
        {proyecto.imagen && (
          <img
            src={proyecto.imagen}
            alt={proyecto.titulo}
            style={{
              maxWidth: "100%",
              maxHeight: "350px",
              borderRadius: "6px",
              marginBottom: "15px",
              objectFit: "cover",
            }}
          />
        )}
        <p>
          <strong>Descripción:</strong> {proyecto.descripcion}
        </p>
        <p>
          <strong>Tipo de Proyecto:</strong> {proyecto.tipo_proyecto}
        </p>
        {proyecto.enlace && (
          <p>
            <strong>Enlace:</strong>{" "}
            <a href={proyecto.enlace} target="_blank" rel="noreferrer">
              {proyecto.enlace}
            </a>
          </p>
        )}
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button
            type="button"
            onClick={() => router.push("/proyectos")}
            style={{ backgroundColor: "#6c757d" }}
          >
            Volver
          </button>
          <button type="button" onClick={() => router.push(`/editar/${id}`)}>
            Editar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={{ backgroundColor: "red" }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </main>
  );
}
