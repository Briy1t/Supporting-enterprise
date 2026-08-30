import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ContratoForm from "./ContratoForm";
import ContratoCard from "./ContratoCard";
import ModalConfirmacion from "./ModalConfirmacion";
import { 
  ArrowLeft, 
  Send, 
  FilePlus, 
  Save, 
  UploadCloud, 
  RefreshCw, 
  History, 
  FileText, 
  Download 
} from "lucide-react";

export default function Contratos() {
  const [lead, setLead] = useState(null);
  const [contratoActual, setContratoActual] = useState(null);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [historialContratos, setHistorialContratos] = useState([]);
  const [correoEnvio, setCorreoEnvio] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modal, setModal] = useState({ visible: false, accion: null });

  const params = new URLSearchParams(window.location.search);
  const leadId = params.get("lead");

  const cargarTodo = () => {
    if (!leadId) return;

    // 1. Cargar Lead
    fetch(`http://localhost:8001/admin/forms/${leadId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setLead(data);
          setCorreoEnvio(data.correo || "");
        }
      });

    // 2. Cargar Contrato Actual
    fetch(`http://localhost:8001/contratos/lead/${leadId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setContratoActual(data))
      .catch(() => setContratoActual(null));

    // 3. Cargar Servicios
    fetch("http://localhost:8001/servicios")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setServiciosDisponibles(data);
      });

    // 4. Cargar Historial
    fetch(`http://localhost:8001/contratos/historial/${leadId}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setHistorialContratos(Array.isArray(data) ? data : []);
      })
      .catch(() => setHistorialContratos([]));
  };

  useEffect(() => {
    cargarTodo();
  }, [leadId]);

  const guardarCambiosLead = async () => {
    try {
      await fetch(`http://localhost:8001/admin/forms/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      alert("Datos del lead actualizados correctamente.");
    } catch (error) {
      alert("Error al actualizar el lead.");
    }
  };

  const handleServicios = (e) => {
    const value = Number(e.target.value);
    if (e.target.checked) {
      setServiciosSeleccionados((prev) => [...prev, value]);
    } else {
      setServiciosSeleccionados((prev) => prev.filter((id) => id !== value));
    }
  };

  const renovarContratoActual = async () => {
    if (!contratoActual?.id) {
      alert("No hay un contrato generado para renovar.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8001/contratos/renovar/${contratoActual.id}`, {
        method: "POST",
      });
      if (res.ok) {
        alert("Contrato renovado correctamente.");
        cargarTodo();
      } else {
        alert("Error al renovar el contrato.");
      }
    } catch (err) {
      alert("Error en la petición de renovación.");
    }
  };

// En Contratos.jsx

const enviarContratoPorEmail = async () => {
  if (!modal.contratoId) {
    alert("No se ha especificado un contrato válido.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8001/contratos/enviar/${modal.contratoId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: correoEnvio }),
    });

    if (response.ok) {
      alert("Contrato enviado correctamente por correo.");
      cargarTodo(); // Recargar historial
    } else {
      const err = await response.json();
      alert(`Error: ${err.detail || "No se pudo enviar el correo"}`);
    }
  } catch (error) {
    alert("Error en la conexión con el servidor.");
  } finally {
    setModal({ visible: false, accion: null, contratoId: null });
  }
};

  const subirContratoFirmado = async (file) => {
    if (!contratoActual?.id) {
      alert("Genera un contrato primero antes de subir una copia firmada.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("archivo", file);

      const response = await fetch(`http://localhost:8001/contratos/subir-firmado/${contratoActual.id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Contrato firmado subido correctamente.");
        cargarTodo();
      } else {
        alert("Error al subir el archivo.");
      }
    } catch (error) {
      alert("Error al subir el archivo.");
    }
  };

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="tw-brand-icon"></span> Gestión de Contratos
          </h1>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        {/* DATOS DEL LEAD */}
        {lead && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 animate-fadeIn">
            <h3 className="font-bold text-slate-900 border-b pb-2">Datos</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Empresa</label>
                <input
                  type="text"
                  value={lead.empresa || ""}
                  onChange={(e) => setLead({ ...lead, empresa: e.target.value })}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Contacto</label>
                <input
                  type="text"
                  value={lead.contacto || ""}
                  onChange={(e) => setLead({ ...lead, contacto: e.target.value })}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Correo</label>
                <input
                  type="email"
                  value={lead.correo || ""}
                  onChange={(e) => setLead({ ...lead, correo: e.target.value })}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Teléfono</label>
                <input
                  type="text"
                  value={lead.telefono || ""}
                  onChange={(e) => setLead({ ...lead, telefono: e.target.value })}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white transition"
                />
              </div>
            </div>

            <button
              onClick={guardarCambiosLead}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-sm"
            >
              <Save className="w-4 h-4" /> Guardar cambios
            </button>
          </div>
        )}

        {/* SELECCIÓN DE SERVICIOS */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-800">Seleccionar servicios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50/50">
            {serviciosDisponibles.map((s) => (
              <label
                key={s.id}
                className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 cursor-pointer transition-all shadow-xs"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={s.id}
                    checked={serviciosSeleccionados.includes(s.id)}
                    onChange={handleServicios}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700">{s.nombre}</span>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  {s.precio}€
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ACCIONES DEL CONTRATO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full space-y-3">
            <h3 className="text-sm font-bold text-slate-800">Acciones de Contrato</h3>
            <div className="flex flex-wrap gap-2.5">
              <button
                className="flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
                onClick={() => setMostrarForm(true)}
              >
                <FilePlus className="w-4 h-4" /> Generar contrato
              </button>

              <button
                className="flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition"
                onClick={renovarContratoActual}
              >
                <RefreshCw className="w-4 h-4" /> Renovación
              </button>

              <button
                className="flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                onClick={() => {
                  if (!contratoActual?.id) {
                    alert("Primero debes generar un contrato.");
                    return;
                  }
                  setModal({ visible: true, accion: "enviar", contratoId: contratoActual.id });
                }}
              >
                <Send className="w-4 h-4" /> Enviar por email
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full space-y-2">
            <label className="text-sm font-bold text-slate-800 block">
              Subir contrato firmado
            </label>
            <label className="flex flex-1 items-center justify-center min-h-[50px] px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all group">
              <div className="flex items-center space-x-2">
                <UploadCloud className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">
                  Seleccionar archivo PDF firmado
                </span>
              </div>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && subirContratoFirmado(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        {/* CONTRATO ACTUAL */}
        <ContratoCard leadId={leadId} key={contratoActual?.id || "ninguno"} />

        {/* HISTORIAL DE CONTRATOS */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <History className="w-5 h-5 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-800">Historial de Contratos</h3>
          </div>

          {!Array.isArray(historialContratos) || historialContratos.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No hay historial de contratos registrados para este cliente.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {historialContratos.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.accion} (ID Contrato: #{item.contrato_id || "N/A"})
                      </p>
                      <p className="text-xs text-slate-500">
                        Fecha: {item.fecha} | Duración: {item.duracion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.estado === "firmado"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.estado}
                    </span>

                    {item.archivo_pdf && (
                      <a
                        href={`http://localhost:8001/${item.archivo_pdf.replace(/\\/g, "/")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
                        title="Descargar PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FORMULARIO DE GENERACIÓN (MODAL) */}
        {mostrarForm && (
          <ContratoForm
            leadId={leadId}
            serviciosSeleccionados={serviciosSeleccionados}
            correoEnvio={correoEnvio}
            onClose={() => {
              setMostrarForm(false);
              cargarTodo();
            }}
          />
        )}

        {/* MODAL DE CONFIRMACIÓN */}
        {modal.visible && (
          <ModalConfirmacion
            accion={modal.accion}
            correoEnvio={correoEnvio}
            onClose={() => setModal({ visible: false })}
            onConfirm={enviarContratoPorEmail}
          />
        )}
      </main>
    </div>
  );
}