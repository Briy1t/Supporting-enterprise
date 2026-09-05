import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, Search, Bell, AlertTriangle, Users } from "lucide-react";

export default function Alertas() {
  const [busqueda, setBusqueda] = useState("");
  const [alertas] = useState([
    {
      id: 1,
      cliente: "TechCorp",
      tipo: "CPU Alta",
      severidad: "Alta",
      fecha: "2026-08-03 14:22",
      descripcion: "Uso de CPU superior al 90% durante 5 minutos.",
    },
    {
      id: 2,
      cliente: "DataSolutions",
      tipo: "Intento de acceso",
      severidad: "Media",
      fecha: "2026-08-03 11:05",
      descripcion: "Intento de acceso no autorizado detectado.",
    },
    {
      id: 3,
      cliente: "NetGroup",
      tipo: "Pérdida de paquetes",
      severidad: "Alta",
      fecha: "2026-08-02 22:10",
      descripcion: "Pérdida de paquetes superior al 30%.",
    },
  ]);

  const alertasFiltradas = alertas.filter(
    (a) =>
      a.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.severidad.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6">
        {/* CABECERA */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              <Bell className="w-6 h-6 text-blue-600" /> Alertas del Sistema
            </h1>
          </div>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        {/* FILTRO */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar por cliente, tipo o severidad..."
          />
        </div>

        {/* MÉTRICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Alertas</p>
              <p className="text-2xl font-bold text-slate-900">{alertas.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Alertas Severas</p>
              <p className="text-2xl font-bold text-slate-900">
                {alertas.filter((a) => a.severidad === "Alta").length}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Clientes Afectados</p>
              <p className="text-2xl font-bold text-slate-900">
                {new Set(alertas.map((a) => a.cliente)).size}
              </p>
            </div>
          </div>
        </div>

        {/* TABLA DE ALERTAS */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-3.5">Cliente</th>
                <th className="p-3.5">Tipo</th>
                <th className="p-3.5">Severidad</th>
                <th className="p-3.5">Fecha</th>
                <th className="p-3.5">Descripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {alertasFiltradas.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3.5 font-medium text-slate-900">{a.cliente}</td>
                  <td className="p-3.5">{a.tipo}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        a.severidad === "Alta"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {a.severidad}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500">{a.fecha}</td>
                  <td className="p-3.5 text-slate-600">{a.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PATRONES */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1">
          <h3 className="font-bold text-slate-800 text-sm mb-2">Patrones Detectados</h3>
          <p>• Incremento de alertas de CPU en horas pico (14:00 - 16:00)</p>
          <p>• Intentos de acceso no autorizado desde la misma IP</p>
          <p>• Pérdida de paquetes recurrente en clientes con infraestructura antigua</p>
        </div>
      </main>
    </div>
  );
}