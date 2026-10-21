"use client";

import { useRouter } from "next/navigation";
import { crearProyecto, Proyecto } from "../../api/proyectos";
import ProyectoForm from "../../components/ProyectoForm";

export default function CrearProyectoPage() {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Proyecto>) => {
    try {
      await crearProyecto(data);
      router.push("/proyectos");
    } catch (err) {
      console.error("Error al crear proyecto:", err);
      alert("Hubo un error al crear el proyecto.");
    }
  };

  return (
    <main className="container" style={{ marginTop: "20px" }}>
      <h2>Nuevo Proyecto</h2>
      <ProyectoForm onSubmit={handleSubmit} />
    </main>
  );
}
