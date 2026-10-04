import { ArrowLeft } from "lucide-react";

export default function ClienteAction({ onVolver, tituloBoton = "Volver", children }) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
      <div className="flex items-center gap-3">
        {children}
      </div>
      <button
        onClick={onVolver}
        className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> {tituloBoton}
      </button>
    </div>
  );
}