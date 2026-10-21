import axios from "axios";

export interface Proyecto {
  _id?: string;
  id?: string;
  titulo: string;
  descripcion: string;
  tipo_proyecto: string;
  enlace?: string;
  imagen?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/proyectos";

export const obtenerProyectos = () => axios.get<Proyecto[]>(API_URL);
export const crearProyecto = (data: Partial<Proyecto>) => axios.post<Proyecto>(API_URL, data);
export const eliminarProyecto = (id: string) => axios.delete(`${API_URL}/${id}`);
export const actualizarProyecto = (id: string, data: Partial<Proyecto>) =>
  axios.put<Proyecto>(`${API_URL}/${id}`, data);
export const obtenerProyectoPorId = (id: string) =>
  axios.get<Proyecto>(`${API_URL}/${id}`);
