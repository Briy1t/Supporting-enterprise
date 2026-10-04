import { useParams, Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { Bell, ArrowLeft, Users } from "lucide-react";
import useAlertasTecnico from "../hooks/useAlertasTecnico";

export default function TecnicoAlertas() {
  const { id } = useParams();
  const { alertas, loading, error } = useAlertasTecnico(id);

  if (loading) return <p>Cargando alertas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6 animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-supporting-gray">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-rose-600" />
            Alertas del Técnico
          </h1>

          <Link
            to={`/tecnicos/${id}`}
            className="btn btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
        </div>

        {/* Contenido */}
        {alertas.length === 0 ? (
          <p className="text-slate-600">Este técnico no tiene alertas registradas.</p>
        ) : (
          <div className="space-y-4">
            {alertas.map((alerta) => (
              <div
                key={alerta.id}
                className="tw-card-generic flex justify-between items-center animate-scaleIn border border-rose-200"
              >
                <div>
                  <p className="font-semibold text-slate-900">{alerta.tipo}</p>
                  <p className="text-sm text-slate-600">{alerta.mensaje}</p>
                  <p className="text-sm text-slate-600">Fecha: {alerta.fecha}</p>
                </div>

                <Link
                  to={`/clientes/${alerta.cliente_id}`}
                  className="btn btn-danger flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
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
