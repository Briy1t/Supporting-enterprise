import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { crearCita } from "../services/citas.api";

export default function CrearCita() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cliente_id: "",
    fecha: "",
    motivo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearCita(id, form);
    navigate(`/tecnicos/${id}/calendario`);
  };

  return (
    <div className="tw-layout">
      <Sidebar />
      <main className="tw-layout-content space-y-6 animate-fadeIn">
        <h1 className="text-2xl font-bold">Crear cita</h1>

        <form className="tw-card p-6 space-y-4" onSubmit={handleSubmit}>
          <input type="number" name="cliente_id" className="input" onChange={handleChange} required />
          <input type="datetime-local" name="fecha" className="input" onChange={handleChange} required />
          <textarea name="motivo" className="input" onChange={handleChange} required />
          <button className="btn btn-primary w-full">Guardar cita</button>
        </form>
      </main>
    </div>
  );
}
