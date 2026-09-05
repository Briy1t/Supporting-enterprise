import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Kanban from "./Kanban";

export default function Administracion() {
  const navigate = useNavigate();

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              <Settings className="w-6 h-6 text-blue-600" /> Administración
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Gestiona los clientes interesados según su estado comercial.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        {/* Tablero Kanban */}
        <section>
          <Kanban />
        </section>
      </main>
    </div>
  );
}