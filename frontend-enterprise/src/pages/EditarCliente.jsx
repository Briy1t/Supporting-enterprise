import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeft } from "lucide-react";

export default function EditarCliente() {
  const { id } = useParams();
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/clientes/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8001/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Cliente actualizado correctamente");
  };

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content max-w-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <span className="tw-brand-icon"></span> Editar Cliente
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
            <input name="empresa" value={form.empresa || ""} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Contacto</label>
            <input name="contacto" value={form.contacto || ""} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Correo</label>
            <input name="correo" value={form.correo || ""} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Mensaje</label>
            <textarea name="mensaje" value={form.mensaje || ""} onChange={handleChange} className="w-full p-2 text-sm border rounded-lg bg-slate-50 h-20" />
          </div>

          <button className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            Actualizar Cliente
          </button>
        </form>
      </main>
    </div>
  );
}