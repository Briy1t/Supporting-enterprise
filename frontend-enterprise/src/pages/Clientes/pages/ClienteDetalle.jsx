import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { ArrowLeft, Edit3, User, CheckCircle2, Calendar, Bell } from "lucide-react";

export default function ClienteDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [contrato, setContrato] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resCliente = await fetch(`http://localhost:8001/clientes/${id}`);
        if (resCliente.ok) {
          const dataCliente = await resCliente.json();
          setCliente(dataCliente);
        }

        const resContrato = await fetch(`http://localhost:8001/contratos/cliente/${id}`).catch(() => null);
        if (resContrato && resContrato.ok) {
          const dataContrato = await resContrato.json();
          setContrato(dataContrato);
        }
      } catch (err) {
        console.error("Error cargando detalle del cliente:", err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id]);

  if (cargando) {
    return (
      <div className="tw-layout">
        <Sidebar />
        <main className="tw-layout-content p-6 flex justify-center items-center">
          <p className="text-slate-500">Cargando información del cliente...</p>
        </main>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="tw-layout">
        <Sidebar />
        <main className="tw-layout-content p-6">
          <p className="text-red-500">No se encontró el cliente.</p>
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-slate-200 rounded-lg">Volver</button>
        </main>
      </div>
    );
  }

  return (
    <div className="tw-layout">
      <Sidebar />
      <main className="tw-layout-content space-y-6 p-6">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              {cliente.nombre}
            </h1>
            <p className="text-sm text-slate-500">{cliente.empresa || "Cliente Particular"}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/editar-cliente/${id}`)}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              <Edit3 className="w-4 h-4" /> Editar Cliente
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Volver
            </button>
          </div>
        </div>

        <div className="flex border-b border-slate-200 space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("general")}
            className={`pb-3 text-sm font-medium transition border-b-2 whitespace-nowrap ${activeTab === "general" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Información General
          </button>
          <button
            onClick={() => setActiveTab("contrato")}
            className={`pb-3 text-sm font-medium transition border-b-2 whitespace-nowrap ${activeTab === "contrato" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Contrato y Administración
          </button>
          <button
            onClick={() => setActiveTab("tecnicos")}
            className={`pb-3 text-sm font-medium transition border-b-2 whitespace-nowrap ${activeTab === "tecnicos" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Técnicos y Citas
          </button>
          <button
            onClick={() => setActiveTab("servicios")}
            className={`pb-3 text-sm font-medium transition border-b-2 whitespace-nowrap ${activeTab === "servicios" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Servicios
          </button>
          <button
            onClick={() => setActiveTab("alertas")}
            className={`pb-3 text-sm font-medium transition border-b-2 whitespace-nowrap ${activeTab === "alertas" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Alertas
          </button>
        </div>

        {/* Contenido Dinámico de Pestañas */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Detalles de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-500">Correo electrónico:</span>
                  <p className="text-slate-800">{cliente.email || cliente.correo || "No registrado"}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-500">Teléfono:</span>
                  <p className="text-slate-800">{cliente.telefono || "No registrado"}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-500">Preferencia de contacto:</span>
                  <p className="text-slate-800 uppercase">{cliente.preferencia || "Correo"}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-500">Estado:</span>
                  <p className="text-slate-800"><span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700">{cliente.estado || "Activo"}</span></p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "contrato" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">Gestión de Contrato</h3>
                <button 
                  onClick={() => navigate(`/administracion/contratos/editar/${cliente.id}`)}
                  className="px-3.5 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition"
                >
                  Renovar / Actualizar Contrato
                </button>
              </div>
              {contrato ? (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-sm">
                  <p><strong>ID Contrato:</strong> {contrato.id}</p>
                  <p><strong>Fecha de Inicio:</strong> {contrato.fecha_inicio || contrato.inicio || "No especificada"}</p>
                  <p><strong>Estado del Contrato:</strong> {contrato.estado || "Activo"}</p>
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No hay contrato sincronizado o está pendiente de enlace con el módulo de Administración.</p>
              )}
            </div>
          )}

          {activeTab === "tecnicos" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Técnicos Asignados y Citas</h3>
              <p className="text-sm text-slate-500">Módulo de Técnicos en desarrollo. Aquí se gestionarán las citas y el personal técnico asignado a este cliente.</p>
              <div className="p-6 border border-dashed border-slate-300 rounded-lg bg-slate-50 text-center text-sm text-slate-400">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                Sin citas ni técnicos asignados actualmente.
              </div>
            </div>
          )}

          {activeTab === "servicios" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Servicios Activos</h3>
              {cliente.servicios && cliente.servicios.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cliente.servicios.map((s, idx) => (
                    <div key={idx} className="p-3 border border-slate-200 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-800">{typeof s === "object" ? s.nombre : s}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No hay servicios específicos asociados a este cliente.</p>
              )}
            </div>
          )}

          {activeTab === "alertas" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Alertas del Cliente</h3>
              <p className="text-sm text-slate-500">Módulo de Alertas pendiente de finalización.</p>
              <div className="p-6 border border-dashed border-slate-300 rounded-lg bg-slate-50 text-center text-sm text-slate-400">
                <Bell className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                No hay alertas activas en este momento.
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}