import { useParams, Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { Users, ArrowLeft } from "lucide-react";
import useClientesTecnico from "../hooks/useClientesTecnico";

export default function ClientesAsignados() {
  const { id } = useParams();
  const { clientes, loading, error } = useClientesTecnico(id);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-slate-700" />
            Clientes Asignados
          </h1>

          <Link
            to={`/tecnicos/${id}`}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
        </div>

        {/* Contenido */}
        {clientes.length === 0 ? (
          <p className="text-slate-600">Este técnico no tiene clientes asignados.</p>
        ) : (
          <div className="space-y-4">
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-slate-900">{cliente.nombre}</p>
                  <p className="text-sm text-slate-600">{cliente.email}</p>
                  <p className="text-sm text-slate-600">
                    Servicios: {cliente.servicios?.join(", ") || "N/A"}
                  </p>
                </div>

                <Link
                  to={`/clientes/${cliente.id}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                >
                  Ver Cliente
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
