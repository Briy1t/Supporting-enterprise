import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { ArrowLeft, Eye, Edit3, Users, Search, Building2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8001/clientes")
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando clientes:", err);
        setCargando(false);
      });
  }, []);

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.empresa?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6 p-6">
        {/* Cabecera Principal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Gestión de Clientes
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Visualiza, busca y administra el directorio general de tus clientes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Volver
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o empresa..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium self-end md:self-center">
            Total de registros: <span className="text-slate-900 font-bold">{clientes.length}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/75 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">Cliente</th>
                <th className="p-4">Empresa</th>
                <th className="p-4">Servicio Principal</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Ver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {cargando ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm">Cargando directorio de clientes...</p>
                    </div>
                  </td>
                </tr>
              ) : clientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="w-8 h-8 text-slate-300" />
                      <p className="text-sm font-medium text-slate-600">No se encontraron clientes</p>
                      <p className="text-xs text-slate-400">Los clientes aparecerán aquí una vez sean procesados desde administración y contratos.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                clientesFiltrados.map((c) => {
                  const iniciales = c.nombre ? c.nombre.substring(0, 2).toUpperCase() : "CL";
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/60 transition group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 font-semibold flex items-center justify-center text-xs border border-blue-100 shadow-sm">
                            {iniciales}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block">{c.nombre}</span>
                            <span className="text-xs text-slate-400">{c.email || c.correo || "Sin correo"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{c.empresa || "N/A"}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                          <span>{typeof c.servicio === "object" ? c.servicio?.nombre : (c.servicio || "Sin servicio")}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          {c.estado || "Activo"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/clientes/${c.id}`)}
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Ver detalle completo"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}