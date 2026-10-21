import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container" style={{ marginTop: "20px" }}>
      <h2>Bienvenido al Gestor de Proyectos (Next.js)</h2>
      <p>
        Administra tu portafolio de proyectos con operaciones completas de CRUD
        (Crear, Leer, Actualizar y Eliminar) adaptadas a la arquitectura oficial de Next.js App Router.
      </p>
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <Link href="/proyectos">
          <button type="button">Ver Proyectos</button>
        </Link>
        <Link href="/crear">
          <button type="button" style={{ backgroundColor: "#28a745" }}>
            Nuevo Proyecto
          </button>
        </Link>
      </div>
    </main>
  );
}
