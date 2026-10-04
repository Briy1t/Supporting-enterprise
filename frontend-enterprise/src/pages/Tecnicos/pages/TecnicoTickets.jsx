import { useParams, Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { Wrench, ArrowLeft, Users } from "lucide-react";
import useTicketsTecnico from "../hooks/useTicketsTecnico";

export default function TecnicoTickets() {
  const { id } = useParams();
  const { tickets, loading, error } = useTicketsTecnico(id);

  if (loading) return <p>Cargando tickets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6 animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-supporting-gray">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-green-600" />
            Tickets del Técnico
          </h1>

          <Link
            to={`/tecnicos/${id}`}
            className="btn btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
        </div>

        {/* Contenido */}
        {tickets.length === 0 ? (
          <p className="text-slate-600">Este técnico no tiene tickets asignados.</p>
        ) : (
          <div className="tw-kanban-container">

            {/* Pendientes */}
            <div className="tw-kanban-column animate-scaleIn">
              <div className="tw-kanban-title-container">
                <span className="tw-kanban-title">Pendiente</span>
                <span className="tw-kanban-counter bg-amber-50 text-amber-700 border border-amber-200">
                  {tickets.filter(t => t.estado === "pendiente").length}
                </span>
              </div>

              {tickets
                .filter(t => t.estado === "pendiente")
                .map(ticket => (
                  <div key={ticket.id} className="tw-lead-card">
                    <p className="tw-lead-name">Ticket #{ticket.id}</p>
                    <p className="tw-lead-info">Prioridad: {ticket.prioridad}</p>
                    <p className="tw-lead-info">Fecha: {ticket.fecha}</p>

                    <Link
                      to={`/clientes/${ticket.cliente_id}`}
                      className="tw-btn tw-btn-cliente"
                    >
                      <Users className="w-4 h-4" />
                      Ver Cliente
                    </Link>
                  </div>
                ))}
            </div>

            {/* En curso */}
            <div className="tw-kanban-column animate-scaleIn">
              <div className="tw-kanban-title-container">
                <span className="tw-kanban-title">En curso</span>
                <span className="tw-kanban-counter bg-blue-50 text-blue-700 border border-blue-200">
                  {tickets.filter(t => t.estado === "en_curso").length}
                </span>
              </div>

              {tickets
                .filter(t => t.estado === "en_curso")
                .map(ticket => (
                  <div key={ticket.id} className="tw-lead-card">
                    <p className="tw-lead-name">Ticket #{ticket.id}</p>
                    <p className="tw-lead-info">Prioridad: {ticket.prioridad}</p>
                    <p className="tw-lead-info">Fecha: {ticket.fecha}</p>

                    <Link
                      to={`/clientes/${ticket.cliente_id}`}
                      className="tw-btn tw-btn-llamado"
                    >
                      <Users className="w-4 h-4" />
                      Ver Cliente
                    </Link>
                  </div>
                ))}
            </div>

            {/* Resueltos */}
            <div className="tw-kanban-column animate-scaleIn">
              <div className="tw-kanban-title-container">
                <span className="tw-kanban-title">Resuelto</span>
                <span className="tw-kanban-counter bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {tickets.filter(t => t.estado === "resuelto").length}
                </span>
              </div>

              {tickets
                .filter(t => t.estado === "resuelto")
                .map(ticket => (
                  <div key={ticket.id} className="tw-lead-card">
                    <p className="tw-lead-name">Ticket #{ticket.id}</p>
                    <p className="tw-lead-info">Prioridad: {ticket.prioridad}</p>
                    <p className="tw-lead-info">Fecha: {ticket.fecha}</p>

                    <Link
                      to={`/clientes/${ticket.cliente_id}`}
                      className="tw-btn tw-btn-concretado"
                    >
                      <Users className="w-4 h-4" />
                      Ver Cliente
                    </Link>
                  </div>
                ))}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
