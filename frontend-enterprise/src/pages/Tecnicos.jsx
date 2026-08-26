import Sidebar from "../components/Sidebar";
import { ArrowLeft, UserCheck } from "lucide-react";

export default function Tecnicos() {
  const tecnicos = [
    {
      id: 1,
      nombre: "Laura Martínez",
      especialidad: "Especialista en Soporte IT",
      descripcion: "Resolución de incidencias, mantenimiento y asistencia remota.",
    },
    {
      id: 2,
      nombre: "Carlos Gómez",
      especialidad: "Ingeniero de Hardening",
      descripcion: "Endurecimiento de servidores, seguridad avanzada y auditorías.",
    },
    {
      id: 3,
      nombre: "Andrea Ruiz",
      especialidad: "Analista de Monitorización",
      descripcion: "Supervisión 24/7, alertas inteligentes y análisis predictivo.",
    },
    {
      id: 4,
      nombre: "Javier Torres",
      especialidad: "Administrador de Redes",
      descripcion: "Gestión de infraestructura, firewalls y conectividad.",
    },
  ];

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              <span className="tw-brand-icon"></span> Equipo Técnico
            </h1>
          </div>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tecnicos.map((t) => (
            <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900">{t.nombre}</h3>
                <p className="text-xs font-semibold text-blue-600">{t.especialidad}</p>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">{t.descripcion}</p>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button className="flex-1 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition">
                  Editar
                </button>
                <button className="flex-1 py-1.5 text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition">
                  Desactivar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}