"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { obtenerProyectoPorId, actualizarProyecto, Proyecto } from "../../../api/proyectos";
import ProyectoForm from "../../../components/ProyectoForm";

export default function EditarProyectoPage() {
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
        console.error("Error al obtener proyecto:", err);
        setError("No se pudo cargar la información del proyecto.");
      })
      .finally(() => setCargando(false));
  }, [id]);

  const handleSubmit = async (data: Partial<Proyecto>) => {
    if (!id) return;
    try {
      await actualizarProyecto(id, data);
      router.push("/proyectos");
    } catch (err) {
      console.error("Error al actualizar proyecto:", err);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  if (cargando) return <p className="container" style={{ marginTop: "20px" }}>Cargando...</p>;
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
      <h2>Editar Proyecto</h2>
      <ProyectoForm initialData={proyecto} onSubmit={handleSubmit} />
    </main>
  );
}
