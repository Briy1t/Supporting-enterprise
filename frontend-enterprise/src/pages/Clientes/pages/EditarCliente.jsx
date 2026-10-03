import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { ArrowLeft, Save, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

export default function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    empresa: "",
    nombre: "",
    email: "",
    telefono: "",
    preferencia: "correo",
    servicios: []
  });
  const [catalogoServicios, setCatalogoServicios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resCliente = await fetch(`http://localhost:8001/clientes/${id}`);
        if (resCliente.ok) {
          const data = await resCliente.json();
          setForm({
            empresa: data.empresa || "",
            nombre: data.nombre || data.contacto || "",
            email: data.email || data.correo || "",
            telefono: data.telefono || "",
            preferencia: data.preferencia || "correo",
            servicios: data.servicios ? data.servicios.map(s => typeof s === "object" ? s.id : s) : []
          });
        }

        const resServicios = await fetch(`http://localhost:8001/servicios`);
        if (resServicios.ok) {
          const dataServicios = await resServicios.json();
          setCatalogoServicios(dataServicios);
        }
      } catch (err) {
        console.error("Error cargando datos para editar:", err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServicioToggle = (servicioId) => {
    setForm((prev) => {
      const yaExiste = prev.servicios.includes(servicioId);
      return {
        ...prev,
        servicios: yaExiste 
          ? prev.servicios.filter(s => s !== servicioId)
          : [...prev.servicios, servicioId]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8001/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al actualizar el cliente");

      alert("Cliente actualizado correctamente");
      navigate(`/clientes/${id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al actualizar el cliente.");
    }
  };

  if (cargando) {
    return (
      <div className="tw-layout">
        <Sidebar />
        <main className="tw-layout-content p-6 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </main>
      </div>
    );
  }

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content max-w-3xl space-y-6 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">Editar Cliente</h1>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        <form className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold text-slate-600">Empresa</label>
            <input name="empresa" value={form.empresa} onChange={handleChange} className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Contacto / Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">Correo Electrónico</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Teléfono</label>
              <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Preferencia de Contacto</label>
            <select name="preferencia" value={form.preferencia} onChange={handleChange} className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1">
              <option value="correo">Correo</option>
              <option value="telefono">Teléfono</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Modificar Servicios Contratados
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {catalogoServicios.map((s) => {
                const seleccionado = form.servicios.includes(s.id);
                return (
                  <div 
                    key={s.id} 
                    onClick={() => handleServicioToggle(s.id)}
                    className={`p-3 border rounded-lg cursor-pointer flex items-center justify-between transition ${seleccionado ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-medium' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                  >
                    <span className="text-sm">{s.nombre}</span>
                    {seleccionado && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2">
              <Save className="w-4 h-4" /> Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}