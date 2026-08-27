import { useNavigate } from "react-router-dom";
import { Mail, Phone, PhoneCall, Clock, CheckCircle2, FileText, UserPlus, Trash2 } from "lucide-react";

export default function LeadCard({ lead, cambiarEstado, descartar }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
      
      {/* Nombre */}
      <h4 className="font-bold text-slate-900 text-base">{lead.contacto}</h4>

      {/* Datos de contacto */}
      <div className="space-y-1.5 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${lead.correo}`}
            target="_blank"
            rel="noreferrer"
            className="p-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
          <span className="truncate">{lead.correo}</span>
        </div>

        {lead.telefono && (
          <div className="flex items-center gap-2">
            <a
              href={`tel:${lead.telefono}`}
              className="p-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <span>{lead.telefono}</span>
          </div>
        )}
      </div>

      {/* Mensaje */}
      {lead.mensaje && (
        <div className="p-2 bg-slate-50 rounded text-xs text-slate-600 italic border border-slate-100">
          "{lead.mensaje}"
        </div>
      )}

      {/* Grid de Botones */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">

        <button
          onClick={() => cambiarEstado(lead.id, "llamado")}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
        >
          <PhoneCall className="w-3.5 h-3.5" /> Llamado
        </button>

        <button
          onClick={() => cambiarEstado(lead.id, "esperando_respuesta")}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg transition"
        >
          <Clock className="w-3.5 h-3.5" /> Esperando
        </button>

        <button
          onClick={() => cambiarEstado(lead.id, "aceptado")}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition"
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Concretado
        </button>

        <button
          onClick={() => (window.location.href = `/contratos?lead=${lead.id}`)}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition"
        >
          <FileText className="w-3.5 h-3.5" /> Contrato
        </button>

        <button
          onClick={() =>
            (window.location.href = `/crear-cliente?contacto=${lead.contacto}&correo=${lead.correo}&telefono=${lead.telefono}&lead_id=${lead.id}`)
          }
          className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition"
        >
          <UserPlus className="w-3.5 h-3.5" /> Crear Cliente
        </button>

        <button
          onClick={() => descartar(lead.id)}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition"
        >
          <Trash2 className="w-3.5 h-3.5" /> Descartar
        </button>

      </div>
    </div>
  );
}
