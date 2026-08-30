import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

export default function CrearCliente() {
  const params = new URLSearchParams(window.location.search);

  const [serviciosContratados, setServiciosContratados] = useState([]);
  const [cargandoServicios, setCargandoServicios] = useState(true);

  const [form, setForm] = useState({
    empresa: params.get("empresa") || "",
    contacto: params.get("contacto") || "",
    correo: params.get("correo") || "",
    lead_id: params.get("lead_id") ? Number(params.get("lead_id")) : null,
    telefono: params.get("telefono") || "",
    preferencia: params.get("preferencia") || "correo",
    servicios: [],
  });

  // Diagnóstico temporal en consola
  useEffect(() => {
    const diagnosticarServicios = async () => {
      const contratoId = params.get("contrato_id");
      const leadId = params.get("lead_id");
      
      console.log("QueryParams -> lead_id:", leadId, "contrato_id:", contratoId);

      if (leadId) {
        try {
          const res = await fetch(`http://localhost:8001/admin/forms`);
          const data = await res.json();
          console.log("Datos recibidos del backend:", data);
        } catch (err) {
          console.error("Error en diagnóstico:", err);
        }
      }
    };
    diagnosticarServicios();
  }, []);

  // Carga de servicios del contrato
  useEffect(() => {
    const cargarServiciosDelContrato = async () => {
      try {
        const leadId = params.get("lead_id");
        const contratoId = params.get("contrato_id");
        const serviciosUrl = params.get("servicios");

        let idsServicios = [];

        // 1. Si tenemos lead_id o contrato_id, consultamos a la API el contrato firmado
        if (leadId || contratoId) {
          const endpoint = contratoId 
            ? `http://localhost:8001/contratos/${contratoId}`
            : `http://localhost:8001/contratos/lead/${leadId}`;

          const resContrato = await fetch(endpoint);
          if (resContrato.ok) {
            const dataContrato = await resContrato.json();
            
            if (Array.isArray(dataContrato.servicios)) {
              idsServicios = dataContrato.servicios.map((s) =>
                typeof s === "object" ? Number(s.id) : Number(s)
              );
            }
          }
        }

        // 2. Fallback si venían por la URL
        if (idsServicios.length === 0 && serviciosUrl) {
          idsServicios = serviciosUrl.split(",").map(Number).filter(Boolean);
        }

        // 3. Consultar la lista maestra de servicios
        if (idsServicios.length > 0) {
          const resCat = await fetch("http://localhost:8001/servicios");
          if (resCat.ok) {
            const catalogoBD = await resCat.json();
            const coincidencia = catalogoBD.filter((s) => idsServicios.includes(Number(s.id)));
            
            setServiciosContratados(coincidencia);
            setForm((prev) => ({
              ...prev,
              servicios: coincidencia.map((s) => Number(s.id)),
            }));
          }
        }
      } catch (err) {
        console.error("Error al obtener los servicios:", err);
      } finally {
        setCargandoServicios(false);
      }
    };

    cargarServiciosDelContrato();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8001/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.detail || `Error en el servidor (${res.status})`);
      }

      const data = await res.json();
      alert(`¡Cliente creado con éxito!\n\nUsuario: ${data.usuario?.usuario || 'N/A'}\nContraseña: ${data.password_temporal || 'N/A'}`);

      if (form.lead_id) {
        await fetch(`http://localhost:8001/leads/${form.lead_id}`, { method: "DELETE" });
      }

      window.location.href = "/administracion";
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      alert(`Error al procesar la solicitud:\n${error.message}`);
    }
  };

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content max-w-2xl space-y-6">
        {/* Encabezado */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="tw-brand-icon"></span> Crear Cliente
          </h1>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        {/* Formulario principal con onSubmit */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Empresa <span className="text-slate-400 font-normal">(Opcional)</span>
            </label>
            <input 
              name="empresa" 
              value={form.empresa} 
              onChange={handleChange} 
              placeholder="Ej: Tech Solutions o déjalo vacío si es persona natural"
              className="w-full p-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Contacto</label>
            <input 
              name="contacto" 
              value={form.contacto} 
              onChange={handleChange} 
              className="w-full p-2 text-sm border rounded-lg bg-slate-50" 
              required 
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Correo</label>
            <input 
              name="correo" 
              type="email" 
              value={form.correo} 
              onChange={handleChange} 
              className="w-full p-2 text-sm border rounded-lg bg-slate-50" 
              required 
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Servicios Vinculados en el Contrato
            </label>
            
            {cargandoServicios ? (
              <div className="flex items-center gap-2 p-3 text-xs text-slate-500 bg-slate-50 rounded-xl">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Cargando servicios del contrato...</span>
              </div>
            ) : serviciosContratados.length > 0 ? (
              <div className="flex flex-wrap gap-2 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                {serviciosContratados.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-lg shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-slate-800">{s.nombre}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs text-amber-700 font-medium">
                  No se detectaron servicios asociados en el contrato.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Teléfono</label>
            <input 
              name="telefono" 
              value={form.telefono} 
              onChange={handleChange} 
              className="w-full p-2 text-sm border rounded-lg bg-slate-50" 
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Preferencia de contacto</label>
            <select 
              name="preferencia" 
              value={form.preferencia} 
              onChange={handleChange} 
              className="w-full p-2 text-sm border rounded-lg bg-slate-50"
            >
              <option value="correo">Correo</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="llamada">Llamada</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition cursor-pointer"
          >
            Guardar Cliente
          </button>
        </form>
      </main>
    </div>
  );
}