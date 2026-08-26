import { useEffect, useState } from "react";
import { Download, FileCheck } from "lucide-react";

export default function ContratoCard({ leadId }) {
  const [contrato, setContrato] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8001/contratos/${leadId}`)
      .then((res) => res.json())
      .then((data) => setContrato(data.contrato));
  }, [leadId]);

  if (!contrato) return <p className="text-sm text-slate-500 italic">No hay contrato generado.</p>;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <h3 className="font-bold text-slate-900 flex items-center gap-2">
        <FileCheck className="w-5 h-5 text-emerald-600" /> Contrato Actual
      </h3>
      <div className="text-sm text-slate-600 space-y-1">
        <p><strong className="text-slate-800">Duración:</strong> {contrato.duracion}</p>
        <p><strong className="text-slate-800">Servicios:</strong> {contrato.servicios.join(", ")}</p>
        <p><strong className="text-slate-800">Estado:</strong> <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700">{contrato.estado}</span></p>
      </div>

      <a
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm mt-2"
        href={`http://localhost:8001/contratos/descargar/${leadId}`}
        target="_blank"
        rel="noreferrer"
      >
        <Download className="w-4 h-4" /> Descargar PDF
      </a>
    </div>
  );
}