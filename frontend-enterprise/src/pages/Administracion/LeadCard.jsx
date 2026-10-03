import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  FileText, 
  UserPlus, 
  Trash2, 
  AlertTriangle 
} from "lucide-react";

export default function LeadCard({ lead, cambiarEstado, descartar }) {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  const confirmarDescarte = () => {
    descartar(lead.id);
    setMostrarModal(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h4 className="font-bold text-slate-900 text-base">{lead.contacto}</h4>

        <div className="space-y-2 text-xs text-slate-600">
          
          <div className="flex items-center gap-2">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${lead.correo}`}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors flex items-center justify-center shrink-0"
              title="Redactar correo en Gmail"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a 
              href={`mailto:${lead.correo}`}
              className="hover:underline text-slate-800 font-semibold truncate"
              title="Enviar correo"
            >
              {lead.correo}
            </a>
          </div>

          {lead.telefono && lead.telefono.trim() !== "" ? (
            <div className="flex items-center gap-2">
              <a
                href={`tel:${lead.telefono.replace(/\s+/g, '')}`}
                className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors flex items-center justify-center shrink-0"
                title="Hacer llamada telefónica"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a 
                href={`tel:${lead.telefono.replace(/\s+/g, '')}`} 
                className="hover:underline text-slate-800 font-semibold"
              >
                {lead.telefono}
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-400 italic">
              <div className="p-1.5 bg-slate-100 rounded-lg shrink-0">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span>Sin teléfono registrado</span>
            </div>
          )}
        </div>


        {lead.mensaje && (
          <div className="p-2 bg-slate-50 rounded-lg text-xs text-slate-600 italic border border-slate-100">
            "{lead.mensaje}"
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
          <button
            onClick={() => cambiarEstado(lead.id, "llamado")}
            className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Llamado
          </button>

          <button
            onClick={() => cambiarEstado(lead.id, "esperando_respuesta")}
            className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg transition cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" /> Esperando
          </button>

          <button
            onClick={() => cambiarEstado(lead.id, "aceptado")}
            className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Concretado
          </button>

          <button
            onClick={() => navigate(`/contratos?lead=${lead.id}`)}
            className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" /> Contrato
          </button>

          <button
            onClick={() =>
              navigate(`/crear-cliente?contacto=${encodeURIComponent(lead.contacto)}&correo=${encodeURIComponent(lead.correo)}&telefono=${encodeURIComponent(lead.telefono || '')}&lead_id=${lead.id}`)
            }
            className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" /> Crear Cliente
          </button>

          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Descartar
          </button>
        </div>
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-100 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">¿Eliminar datos del prospecto?</h3>
                <p className="text-xs text-rose-600 font-medium mt-0.5">Esta acción no se puede deshacer.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              Según la política de privacidad, al descartar a <span className="font-semibold text-slate-800">{lead.contacto}</span>, todos sus datos personales serán <strong className="text-rose-600">eliminados permanentemente</strong> del sistema.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setMostrarModal(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarDescarte}
                className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition cursor-pointer"
              >
                Sí, borrar datos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}