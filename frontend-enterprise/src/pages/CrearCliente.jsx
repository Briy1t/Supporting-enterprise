import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

export default function CrearCliente() {
  const params = new URLSearchParams(window.location.search);

  const [serviciosContratados, setServiciosContratados] = useState([]);
  const [cargandoServicios, setCargandoServicios] = useState(true);

  const [form, setForm] = useState({
    empresa: params.get("empresa") || "",
    nombre: params.get("contacto") || "",
    email: params.get("correo") || "",
    lead_id: params.get("lead_id") ? Number(params.get("lead_id")) : null,
    telefono: params.get("telefono") || "",
    preferencia: params.get("preferencia") || "correo",
    servicios: [],
  });

  // Carga de servicios desde la tabla/creación de contratos
  useEffect(() => {
    const cargarServiciosDelContrato = async () => {
      try {
        const leadId = params.get("lead_id");
        const serviciosUrl = params.get("servicios");

        console.log("--- BUSCANDO CONTRATO DEL LEAD ---");
        let idsOStringsServicios = [];

        if (leadId) {
          // Ruta corregida para consultar el contrato del lead directamente por ID
          const endpointContrato = `http://localhost:8001/contratos/${leadId}`;
          console.log("Consultando:", endpointContrato);

          const res = await fetch(endpointContrato);
          if (res.ok) {
            const dataContrato = await res.json();
            console.log("Contrato(s) encontrado(s):", dataContrato);

            const listaContratos = Array.isArray(dataContrato) ? dataContrato : [dataContrato];
            
            listaContratos.forEach((contrato) => {
              const items = contrato?.servicios || contrato?.servicios_contratados || contrato?.items || [];
              items.forEach((s) => {
                if (typeof s === "object" && s !== null) {
                  idsOStringsServicios.push(s.id ?? s.nombre ?? s.servicio);
                } else {
                  idsOStringsServicios.push(s);
                }
              });
            });
          }
        }

        // Fallback por URL si fuera necesario
        if (idsOStringsServicios.length === 0 && serviciosUrl) {
          idsOStringsServicios = serviciosUrl.split(",").map((s) => s.trim()).filter(Boolean);
        }

        console.log("Servicios extraídos del contrato:", idsOStringsServicios);

        // Consultar el catálogo maestro para pintar los nombres y obtener IDs limpios
        const resCat = await fetch("http://localhost:8001/servicios");
        if (resCat.ok) {
          const catalogoBD = await resCat.json();

          const coincidencia = catalogoBD.filter((catItem) => {
            return idsOStringsServicios.some((itemBuscado) => {
              const idCoincide = Number(catItem.id) === Number(itemBuscado);
              const nombreCoincide = String(catItem.nombre).trim().toLowerCase() === String(itemBuscado).trim().toLowerCase();
              return idCoincide || nombreCoincide;
            });
          });

          console.log("Servicios coincidentes:", coincidencia);

          setServiciosContratados(coincidencia);
          setForm((prev) => ({
            ...prev,
            servicios: coincidencia.map((s) => Number(s.id)),
          }));
        }
      } catch (err) {
        console.error("Error al cargar los servicios del contrato:", err);
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
              name="nombre" 
              value={form.nombre} 
              onChange={handleChange} 
              className="w-full p-2 text-sm border rounded-lg bg-slate-50" 
              required 
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Correo</label>
            <input 
              name="email" 
              type="email" 
              value={form.email} 
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
                  No se encontraron servicios asociados a este contrato en la base de datos.
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