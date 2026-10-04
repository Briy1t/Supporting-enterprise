import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { UserCheck, Calendar, Bell, Wrench, Users, ArrowLeft } from "lucide-react";
import { getTecnicoById } from "../services/tecnicos.api";
import { eliminarTecnico } from "../services/tecnicos.api";

export default function TecnicoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tecnico, setTecnico] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTecnicoById(id).then((data) => {
      setTecnico(data);
      setLoading(false);
    });
  }, [id]);

  const handleEliminar = async () => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este técnico?");
    if (!confirmar) return;

    await eliminarTecnico(id);
    navigate("/tecnicos");
  };

  if (loading) {
    return (
      <div className="tw-layout">
        <Sidebar />
        <main className="tw-layout-content animate-fadeIn">
          <p>Cargando técnico...</p>
        </main>
      </div>
    );
  }

  if (!tecnico) {
    return (
      <div className="tw-layout">
        <Sidebar />
        <main className="tw-layout-content animate-fadeIn">
          <p>No se encontró el técnico.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6 animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-supporting-gray">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-blue-600" />
            {tecnico.nombre}
          </h1>

          <Link
            to="/tecnicos"
            className="btn btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
        </div>

        <button
          type="button"
          onClick={handleEliminar}
          className="btn btn-danger"
        >
          Eliminar técnico
        </button>

        {/* Información del técnico */}
        <div className="tw-card p-6 space-y-4 max-w-xl animate-scaleIn">
          <p><span className="font-semibold">Especialidad:</span> {tecnico.especialidad}</p>
          <p><span className="font-semibold">Descripción:</span> {tecnico.descripcion}</p>
          <p><span className="font-semibold">Email:</span> {tecnico.email}</p>
        </div>

        {/* Acciones */}
        <div className="tw-dashboard">

          <Link
            to={`/tecnicos/${id}/calendario`}
            className="tw-card flex flex-col items-center gap-2 border border-blue-200 animate-scaleIn"
          >
            <Calendar className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-blue-700">Calendario</span>
          </Link>

          <Link
            to={`/tecnicos/${id}/tickets`}
            className="tw-card flex flex-col items-center gap-2 border border-emerald-200 animate-scaleIn"
          >
            <Wrench className="w-6 h-6 text-emerald-600" />
            <span className="font-semibold text-emerald-700">Tickets</span>
          </Link>

          <Link
            to={`/tecnicos/${id}/alertas`}
            className="tw-card flex flex-col items-center gap-2 border border-rose-200 animate-scaleIn"
          >
            <Bell className="w-6 h-6 text-rose-600" />
            <span className="font-semibold text-rose-700">Alertas</span>
          </Link>

          <Link
            to={`/tecnicos/${id}/clientes`}
            className="tw-card flex flex-col items-center gap-2 border border-slate-200 animate-scaleIn"
          >
            <Users className="w-6 h-6 text-slate-600" />
            <span className="font-semibold text-slate-700">Clientes asignados</span>
          </Link>

          <button
            onClick={handleEliminar}
            className="tw-card flex flex-col items-center gap-2 border border-red-200 animate-scaleIn text-red-700"
          >
            <Users className="w-6 h-6 text-red-600" />
            <span className="font-semibold">Eliminar Técnico</span>
          </button>
          
        </div>
      </main>
    </div>
  );
}
