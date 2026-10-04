import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

import useCalendarioTecnico from "../hooks/useCalendarioTecnico";
import useClientes from "../hooks/useClientes";
import useTecnico from "../hooks/useTecnico";
import useCitasTecnico from "../hooks/useCitasTecnico";

import { Calendar, ArrowLeft } from "lucide-react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function TecnicoCalendario() {
  const { id } = useParams();

  const { eventos, loading, error } = useCalendarioTecnico(id);
  const { clientes } = useClientes();
  const { tecnico } = useTecnico(id);

  const { crearCita, loading: loadingCita, error: errorCita } = useCitasTecnico(id);

  const [showTurnoModal, setShowTurnoModal] = useState(false);
  const [showCitaModal, setShowCitaModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [fechaCita, setFechaCita] = useState("");
  const [motivo, setMotivo] = useState("");
  const [clienteId, setClienteId] = useState("");

  const formatHora = (hora) => (hora ? hora.slice(0, 5) : "");

  if (loading || !tecnico) return null;
  if (error) return null;

  const eventosFormateados = eventos.map((ev) => ({
    id: ev.id,
    title: ev.titulo,
    start: ev.start,
    end: ev.end,
    className:
      ev.tipo === "cita"
        ? "fc-event-cita"
        : ev.tipo === "turno"
        ? "fc-event-turno"
        : ev.tipo === "descanso"
        ? "fc-event-descanso"
        : "fc-event-disponibilidad",
  }));

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowTurnoModal(true);
  };

  const crearTurno = async (turno) => {
    const payload = {
      fecha: selectedDate,
      hora_inicio:
        turno === "mañana"
          ? "09:00"
          : turno === "tarde"
          ? "15:00"
          : "09:00",
      hora_fin:
        turno === "mañana"
          ? "14:00"
          : turno === "tarde"
          ? "18:00"
          : "18:00",
      tipo_turno: turno,
      es_descanso: false,
      descripcion: `Turno ${turno}`,
    };

    await fetch(`http://localhost:8001/tecnicos/${id}/disponibilidad`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    window.location.reload();
  };

  const handleCrearCita = async () => {
    if (!clienteId) return alert("Debe seleccionar un cliente");
    if (!motivo.trim()) return alert("Debe ingresar un motivo");
    if (!fechaCita) return alert("Debe seleccionar fecha y hora");

    const cita = await crearCita({
      clienteId,
      fechaCita,
      motivo,
    });

    if (cita) {
      setShowCitaModal(false);
      setFechaCita("");
      setMotivo("");
      setClienteId("");

      // refrescar calendario sin recargar la página
      window.location.reload();
    }
  };

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" /> Agenda del Técnico
          </h1>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 border rounded-lg">
              <p className="text-sm text-blue-700">
                Turno actual: {formatHora(tecnico.turno_hora_inicio)} –{" "}
                {formatHora(tecnico.turno_hora_fin)}
              </p>
            </div>

            <button
              onClick={() => setShowCitaModal(true)}
              className="btn btn-primary flex items-center gap-2 text-sm"
            >
              Agendar cita
            </button>

            <button
              onClick={() => window.history.back()}
              className="btn btn-secondary flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Volver
            </button>
          </div>
        </div>

        {/* CALENDARIO */}
        <div className="tw-calendar-wrapper">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            weekends={false}
            slotMinTime="09:00:00"
            slotMaxTime="18:00:00"
            slotDuration="00:30:00"
            allDaySlot={false}
            selectable={false}
            dateClick={handleDateClick}
            events={eventosFormateados}
          />
        </div>

        {/* MODAL TURNOS */}
        {showTurnoModal && (
          <div className="tw-modal-overlay fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="tw-modal bg-white p-6 rounded-xl shadow-lg space-y-4 w-80">
              <h3 className="text-lg font-bold text-slate-800">
                Seleccionar Turno
              </h3>

              <button
                onClick={() => crearTurno("mañana")}
                className="btn btn-primary w-full"
              >
                Turno Mañana
              </button>

              <button
                onClick={() => crearTurno("tarde")}
                className="btn btn-primary w-full"
              >
                Turno Tarde
              </button>

              <button
                onClick={() => crearTurno("rotativo")}
                className="btn btn-primary w-full"
              >
                Turno Rotativo
              </button>

              <button
                onClick={() => setShowTurnoModal(false)}
                className="btn btn-danger w-full"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* MODAL CITAS */}
        {showCitaModal && (
          <div className="tw-modal-overlay fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="tw-modal bg-white p-6 rounded-xl shadow-lg space-y-4 w-96">
              <h3 className="text-lg font-bold text-slate-800">Agendar Cita</h3>

              <input
                type="datetime-local"
                className="input w-full"
                onChange={(e) => setFechaCita(e.target.value)}
              />

              <select
                className="input w-full"
                onChange={(e) => setClienteId(e.target.value)}
              >
                <option value="">Seleccionar cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="input w-full"
                placeholder="Motivo"
                onChange={(e) => setMotivo(e.target.value)}
              />

              {errorCita && (
                <p className="text-red-600 text-sm">{errorCita}</p>
              )}

              <button
                onClick={handleCrearCita}
                className="btn btn-primary w-full"
                disabled={loadingCita}
              >
                {loadingCita ? "Creando..." : "Crear Cita"}
              </button>

              <button
                onClick={() => setShowCitaModal(false)}
                className="btn btn-secondary w-full"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
