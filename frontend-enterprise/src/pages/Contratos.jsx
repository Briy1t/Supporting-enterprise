import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, Send, Upload, FileCheck } from "lucide-react";

export default function Contratos() {
  const params = new URLSearchParams(window.location.search);
  const leadId = params.get("lead");

  const [lead, setLead] = useState(null);
  const [contrato, setContrato] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [duracion, setDuracion] = useState("");
  const [politicas, setPoliticas] = useState("");
  const [empresa, setEmpresa] = useState("");

  useEffect(() => {
    if (!leadId) return;

    fetch(`http://localhost:8001/leads/${leadId}`)
      .then((res) => res.json())
      .then((data) => {
        setLead(data);
        setEmpresa(data.empresa || "");
      });

    fetch(`http://localhost:8001/contratos/${leadId}`)
      .then((res) => res.json())
      .then((data) => {
        setContrato(data.contrato || null);
        setHistorial(data.historial || []);
      });
  }, [leadId]);

  const generarContrato = async () => {
    await fetch(`http://localhost:8001/contratos/generar/${leadId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ servicios, duracion, politicas }),
    });
    window.location.reload();
  };

  const enviarContrato = async () => {
    await fetch(`http://localhost:8001/contratos/enviar/${leadId}`, {
      method: "POST",
    });
    window.location.reload();
  };

  const subirContratoFirmado = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    const formData = new FormData();
    formData.append("archivo", archivo);

    await fetch(`http://localhost:8001/contratos/firmado/${leadId}`, {
      method: "POST",
      body: formData,
    });
    window.location.reload();
  };

  if (!lead) return <div className="p-8 text-center text-slate-500">Cargando datos...</div>;

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <span className="tw-brand-icon"></span> Gestión de Contrato
          </h1>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DATOS LEAD */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 border-b pb-2">Datos del Lead</h3>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">Empresa</label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full p-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>
            <div className="text-sm text-slate-600 space-y-1 pt-2">
              <p><strong className="text-slate-800">Contacto:</strong> {lead.contacto}</p>
              <p><strong className="text-slate-800">Correo:</strong> {lead.correo}</p>
              <p><strong className="text-slate-800">Teléfono:</strong> {lead.telefono}</p>
            </div>
          </div>

          {/* CONTRATO ACTUAL */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" /> Contrato Actual
            </h3>
            {contrato ? (
              <div className="space-y-4">
                <p className="text-sm">
                  <strong className="text-slate-800">Estado:</strong>{" "}
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700">
                    {contrato.estado}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                    onClick={enviarContrato}
                  >
                    <Send className="w-3.5 h-3.5" /> Enviar
                  </button>
                  <label className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition">
                    <Upload className="w-3.5 h-3.5" /> Subir Firmado
                    <input type="file" hidden onChange={subirContratoFirmado} />
                  </label>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">No hay contrato generado.</p>
            )}
          </div>
        </div>

        {/* GENERAR CONTRATO */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 border-b pb-2">Generar Nuevo Contrato</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">Servicios (separados por coma)</label>
              <input
                type="text"
                value={servicios.join(", ")}
                onChange={(e) => setServicios(e.target.value.split(","))}
                className="w-full p-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Duración</label>
              <select
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                className="w-full p-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
              >
                <option value="">Seleccionar</option>
                <option value="12 meses">12 meses</option>
                <option value="24 meses">24 meses</option>
                <option value="36 meses">36 meses</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Políticas</label>
            <textarea
              value={politicas}
              onChange={(e) => setPoliticas(e.target.value)}
              className="w-full p-2 text-sm border border-slate-300 rounded-lg bg-slate-50 h-20"
            />
          </div>
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            onClick={generarContrato}
          >
            Generar contrato
          </button>
        </div>

        {/* HISTORIAL */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
          <h3 className="font-bold text-slate-800">Historial</h3>
          {historial.length === 0 ? (
            <p className="text-slate-400 italic">No hay historial.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {historial.map((h, i) => (
                <li key={i} className="py-1">
                  {h.fecha} — <span className="font-semibold">{h.accion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}