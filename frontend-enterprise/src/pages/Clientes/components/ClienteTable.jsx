import { Eye, Edit3 } from "lucide-react";

export default function ClienteTabla({ clientes, onVer, onEditar }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
          <tr>
            <th className="p-3.5">Nombre</th>
            <th className="p-3.5">Empresa</th>
            <th className="p-3.5">Servicio</th>
            <th className="p-3.5">Estado</th>
            <th className="p-3.5 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-slate-400 italic">
                No hay clientes registrados
              </td>
            </tr>
          ) : (
            clientes.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50 transition">
                <td className="p-3.5 font-medium text-slate-900">{c.nombre}</td>
                <td className="p-3.5">{c.empresa || "N/A"}</td>
                <td className="p-3.5">
                  {typeof c.servicio === "object" ? c.servicio?.nombre : (c.servicio || "Sin servicio")}
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700">
                    {c.estado || "Activo"}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => onVer(c.id)}
                    className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition inline-block"
                    title="Ver detalle"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEditar(c.id)}
                    className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition inline-block"
                    title="Editar"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}