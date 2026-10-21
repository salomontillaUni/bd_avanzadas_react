import type { Metadata } from "next";
import Header from "../components/Header";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "CRUD de Proyectos - Next.js",
  description: "CRUD de Proyectos con Next.js y Axios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
