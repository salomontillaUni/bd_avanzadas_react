"use client";

import { useState } from "react";
import "../styles/forms.css";
import { Proyecto } from "../api/proyectos";

interface ProyectoFormProps {
  initialData?: Partial<Proyecto>;
  onSubmit: (data: Partial<Proyecto>) => void;
}

export default function ProyectoForm({
  initialData = {},
  onSubmit,
}: ProyectoFormProps) {
  const [formData, setFormData] = useState<Partial<Proyecto>>({
    titulo: "",
    descripcion: "",
    tipo_proyecto: "",
    imagen: "",
    enlace: "",
    ...initialData,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <label>Título:</label>
      <input
        name="titulo"
        value={formData.titulo || ""}
        onChange={handleChange}
        required
      />

      <label>Descripción:</label>
      <textarea
        name="descripcion"
        value={formData.descripcion || ""}
        onChange={handleChange}
      ></textarea>

      <label>Tipo de Proyecto:</label>
      <input
        name="tipo_proyecto"
        value={formData.tipo_proyecto || ""}
        onChange={handleChange}
      />

      <label>Enlace:</label>
      <input
        name="enlace"
        value={formData.enlace || ""}
        onChange={handleChange}
      />

      <label>Imagen (URL):</label>
      <input
        name="imagen"
        value={formData.imagen || ""}
        onChange={handleChange}
      />

      <button type="submit">Guardar</button>
    </form>
  );
}
