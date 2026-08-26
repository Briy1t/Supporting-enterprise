import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ArrowLeft } from "lucide-react";

export default function CrearCliente() {
  const params = new URLSearchParams(window.location.search);

  const [form, setForm] = useState({
    empresa: params.get("empresa") || "",
    contacto: params.get("contacto") || "",
    correo: params.get("correo") || "",
    mensaje: params.get("mensaje") || "",
    lead_id: params.get("lead_id") || null,
    telefono: "",
    preferencia: "correo",
    servicios: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServicios = (e) => {
    const opciones = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setForm({ ...form, servicios: opciones });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8001/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    alert(`Cliente creado.\nUsuario: ${data.usuario.usuario}\nPass temporal: ${data.password_temporal}`);

    if (form.lead_id) {
      await fetch(`http://localhost:8001/leads/${form.lead_id}`, { method: "DELETE" });
    }

    window.location.href = "/administracion";
  };

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content max-w-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <span className="tw-brand-icon"></span> Crear Cliente
          </h1>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        <form className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold text-slate-600">Empresa</label>
            <input name="empresa" value={form.empresa} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Contacto</label>
            <input name="contacto" value={form.contacto} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Correo</label>
            <input name="correo" value={form.correo} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Mensaje / Notas</label>
            <textarea name="mensaje" value={form.mensaje} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50 h-20" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Servicios</label>
            <select multiple value={form.servicios} onChange={handleServicios} className="w-full p-2 text-sm border rounded-lg bg-slate-50 h-24">
              <option value="hardening">Hardening</option>
              <option value="monitorizacion">Monitorización</option>
              <option value="soporte">Soporte</option>
              <option value="auditoria">Auditoría</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Preferencia de contacto</label>
            <select name="preferencia" value={form.preferencia} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50">
              <option value="correo">Correo</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="llamada">Llamada</option>
            </select>
          </div>

          <button className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            Guardar Cliente
          </button>
        </form>
      </main>
    </div>
  );
}