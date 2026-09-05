import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, CheckCircle2, ShieldCheck, Loader2, UserPlus } from "lucide-react";

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

  useEffect(() => {
    const cargarServiciosDelContrato = async () => {
      try {
        const leadId = params.get("lead_id");
        const serviciosUrl = params.get("servicios");

        console.log("--- BUSCANDO CONTRATO DEL LEAD ---");
        let idsOStringsServicios = [];

        if (leadId) {
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

        if (idsOStringsServicios.length === 0 && serviciosUrl) {
          idsOStringsServicios = serviciosUrl.split(",").map((s) => s.trim()).filter(Boolean);
        }

        console.log("Servicios extraídos del contrato:", idsOStringsServicios);

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
      alert(`¡Cliente creado con éxito!.`);

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

      <main className="tw-layout-content space-y-6">
        
        {/* CABECERA ESTÉTICA */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
          <div>
             <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
            Crear Cliente
            </h1>
          </div>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        {/* CONTENEDOR DEL FORMULARIO CON MAQUETACIÓN PREMIUM */}
        <form onSubmit={handleSubmit} className="tw-form-container">
          
          <div className="tw-form-grid">
            
            {/* Empresa (Ocupa las 2 columnas) */}
            <div className="tw-form-group-full">
              <label className="tw-form-label">
                Empresa <span className="tw-form-label-optional">(Opcional)</span>
              </label>
              <input 
                name="empresa" 
                value={form.empresa} 
                onChange={handleChange} 
                placeholder="Ej: Tech Solutions o déjalo vacío si es persona natural"
                className="tw-form-input" 
              />
            </div>

            {/* Contacto */}
            <div className="tw-form-group">
              <label className="tw-form-label">Contacto</label>
              <input 
                name="nombre" 
                value={form.nombre} 
                onChange={handleChange} 
                placeholder="Nombre completo"
                className="tw-form-input" 
                required 
              />
            </div>

            {/* Correo */}
            <div className="tw-form-group">
              <label className="tw-form-label">Correo</label>
              <input 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="ejemplo@correo.com"
                className="tw-form-input" 
                required 
              />
            </div>

            {/* Teléfono */}
            <div className="tw-form-group">
              <label className="tw-form-label">Teléfono</label>
              <input 
                name="telefono" 
                type="tel" 
                value={form.telefono} 
                onChange={handleChange} 
                placeholder="Ej: 639481938"
                className="tw-form-input" 
              />
            </div>

            {/* Preferencia de contacto */}
            <div className="tw-form-group">
              <label className="tw-form-label">Preferencia de contacto</label>
              <select 
                name="preferencia"
                value={form.preferencia}
                onChange={handleChange}
                className="tw-form-input"
              >
                <option value="correo">Correo</option>
                <option value="telefono">Teléfono</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            {/* Servicios Vinculados en el Contrato (Ocupa las 2 columnas) */}
            <div className="tw-form-group-full">
              <label className="tw-form-label">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                Servicios Vinculados en el Contrato
              </label>
              
              {cargandoServicios ? (
                <div className="tw-services-box items-center justify-center py-6 text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Cargando servicios del contrato...</span>
                </div>
              ) : serviciosContratados.length > 0 ? (
                <div className="tw-services-box">
                  {serviciosContratados.map((s) => (
                    <div key={s.id} className="tw-service-badge-checked">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{s.nombre}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium mt-1">
                  No se encontraron servicios asociados a este contrato en la base de datos.
                </div>
              )}
            </div>

          </div>

          {/* Botón de envío alineado de manera elegante */}
          <button type="submit" className="tw-btn-submit">
            Guardar Cliente
          </button>

        </form>
      </main>
    </div>
  );
}
