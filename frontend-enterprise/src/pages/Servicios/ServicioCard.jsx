import { Edit2, Trash2 } from "lucide-react";

export default function ServicioCard({ servicio, onEditar, onEliminar }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{servicio.nombre}</h3>
        <p className="text-slate-500 text-xs leading-relaxed">{servicio.descripcion}</p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-100">
        <p className="text-xl font-extrabold text-blue-600">{servicio.precio} €</p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onEditar}
            className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            <Edit2 className="w-3.5 h-3.5" /> Editar
          </button>

          <button
            onClick={onEliminar}
            className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}