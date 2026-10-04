import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { UserPlus } from "lucide-react";
import { crearTecnico } from "../services/tecnicos.api";

export default function CrearTecnico() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    especialidad: "",
    descripcion: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearTecnico(form);
    navigate("/tecnicos");
  };

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6 animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-supporting-gray">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
            Crear Técnico
          </h1>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="tw-card p-6 space-y-5 max-w-xl animate-scaleIn"
        >
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Especialidad */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Especialidad</label>
            <input
              type="text"
              name="especialidad"
              value={form.especialidad}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="input"
              rows="3"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Email del técnico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Botón */}
          <button type="submit" className="btn btn-primary w-full">
            Guardar Técnico
          </button>
        </form>
      </main>
    </div>
  );
}
