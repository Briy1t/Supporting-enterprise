import Sidebar from "../../../components/Sidebar";
import useTecnicos from "../hooks/useTecnicos";
import { Link } from "react-router-dom";
import { UserCheck, PlusCircle } from "lucide-react";

export default function TecnicosList() {
  const { tecnicos, loading } = useTecnicos();

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6 animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-supporting-gray">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-blue-600" />
            Técnicos
          </h1>

          <Link
            to="/tecnicos/crear"
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Crear Técnico
          </Link>
        </div>

        {/* Contenido */}
        {loading ? (
          <p>Cargando técnicos...</p>
        ) : (
          <div className="tw-dashboard">
            {tecnicos.map((t) => (
              <Link
                key={t.id}
                to={`/tecnicos/${t.id}`}
                className="tw-card animate-scaleIn"
              >
                <h3 className="font-bold text-slate-900">{t.nombre}</h3>
                <p className="text-xs font-semibold text-blue-600">{t.especialidad}</p>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {t.descripcion}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
