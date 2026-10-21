"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerProyectos, eliminarProyecto, Proyecto } from "../../api/proyectos";
import ProyectoCard from "../../components/ProyectoCard";

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const cargarProyectos = () => {
    setCargando(true);
    obtenerProyectos()
      .then((res) => {
        setProyectos(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al cargar proyectos:", err);
        setError("No se pudo conectar con la API de proyectos.");
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await eliminarProyecto(id);
      setProyectos((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      console.error("Error al eliminar proyecto:", err);
      alert("Error al eliminar el proyecto.");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/editar/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/proyecto/${id}`);
  };

  return (
    <main className="container" style={{ marginTop: "20px" }}>
      <h2>Lista de Proyectos</h2>

      {cargando && <p>Cargando proyectos...</p>}
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error} (Verifica que tu backend esté encendido en http://localhost:3000)
        </p>
      )}

      {!cargando && proyectos.length === 0 && !error && (
        <p>No hay proyectos registrados aún.</p>
      )}

      {proyectos.map((proyecto) => (
        <ProyectoCard
          key={proyecto._id || proyecto.id || Math.random().toString()}
          proyecto={proyecto}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      ))}
    </main>
  );
}
