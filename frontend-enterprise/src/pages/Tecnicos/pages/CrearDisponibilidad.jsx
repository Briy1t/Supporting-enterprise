import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { crearDisponibilidad } from "../services/disponibilidad.api";

export default function CrearDisponibilidad() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearDisponibilidad(id, form);
    navigate(`/tecnicos/${id}/calendario`);
  };

  return (
    <div className="tw-layout">
      <Sidebar />
      <main className="tw-layout-content space-y-6 animate-fadeIn">
        <h1 className="text-2xl font-bold">Crear disponibilidad</h1>

        <form className="tw-card p-6 space-y-4" onSubmit={handleSubmit}>
          <input type="date" name="fecha" className="input" onChange={handleChange} required />
          <input type="time" name="hora_inicio" className="input" onChange={handleChange} required />
          <input type="time" name="hora_fin" className="input" onChange={handleChange} required />
          <textarea name="descripcion" className="input" onChange={handleChange} />
          <button className="btn btn-primary w-full">Guardar disponibilidad</button>
        </form>
      </main>
    </div>
  );
}
