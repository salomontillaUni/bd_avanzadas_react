import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>CRUD Proyectos</h2>
        <nav>
          <Link href="/">Inicio</Link> | <Link href="/proyectos">Proyectos</Link> |{" "}
          <Link href="/crear">Nuevo</Link>
        </nav>
      </div>
    </header>
  );
}
