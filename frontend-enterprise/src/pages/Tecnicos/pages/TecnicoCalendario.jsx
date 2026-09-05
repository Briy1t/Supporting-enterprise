import { useParams, Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { Calendar, ArrowLeft, Users } from "lucide-react";
import useCalendarioTecnico from "../hooks/useCalendarioTecnico";

export default function TecnicoCalendario() {
  const { id } = useParams();
  const { eventos, loading, error } = useCalendarioTecnico(id);

  if (loading) return <p>Cargando calendario...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6 animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-supporting-gray">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Calendario del Técnico
          </h1>

          <Link
            to={`/tecnicos/${id}`}
            className="btn btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
        </div>

        {/* Contenido */}
        {eventos.length === 0 ? (
          <p className="text-slate-600">Este técnico no tiene eventos en el calendario.</p>
        ) : (
          <div className="tw-dashboard">
            {eventos.map((ev) => (
              <div
                key={ev.id}
                className="tw-card animate-scaleIn border border-blue-200"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">{ev.titulo}</h3>
                  <p className="text-sm text-slate-600">{ev.descripcion}</p>
                  <p className="text-sm text-slate-600">Fecha: {ev.fecha}</p>
                </div>

                {ev.cliente_id && (
                  <Link
                    to={`/clientes/${ev.cliente_id}`}
                    className="btn btn-primary flex items-center gap-2 mt-4"
                  >
                    <Users className="w-4 h-4" />
                    Ver Cliente
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
