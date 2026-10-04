import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { ArrowLeft, Edit3, User, CheckCircle2, Calendar, Bell, Wrench, FileText, DollarSign, UserCheck, Save, X } from "lucide-react";

export default function ClienteDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [contrato, setContrato] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Estados para la funcionalidad de edición en línea
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    empresa: "",
    nombre: "",
    email: "",
    telefono: "",
    preferencia: "correo"
  });

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const resCliente = await fetch(`http://localhost:8001/clientes/${id}`);
      if (resCliente.ok) {
        const dataCliente = await resCliente.json();
        setCliente(dataCliente);
        // Inicializamos los valores del formulario con los datos actuales
        setForm({
          empresa: dataCliente.empresa || "",
          nombre: dataCliente.nombre || "",
          email: dataCliente.email || dataCliente.correo || "",
          telefono: dataCliente.telefono || "",
          preferencia: dataCliente.preferencia || "correo"
        });
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

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8001/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al actualizar el cliente");

      alert("¡Cliente actualizado correctamente!");
      setEditando(false);
      cargarDatos(); // Recargamos los datos actualizados
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al actualizar los datos del cliente.");
    }
  };

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
        
        {/* Cabecera Principal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              {editando ? "Editando Cliente" : cliente.nombre}
            </h1>
            <p className="text-sm text-slate-500">
              {cliente.empresa || "Cliente Particular"} — <span className="text-blue-600 font-medium">{cliente.estado || "Activo"}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {!editando ? (
              <button
                onClick={() => setEditando(true)}
                className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer"
              >
                <Edit3 className="w-4 h-4" /> Editar Cliente
              </button>
            ) : (
              <button
                onClick={() => setEditando(false)}
                className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition shadow-sm cursor-pointer"
              >
                <X className="w-4 h-4" /> Cancelar
              </button>
            )}

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Volver
            </button>
          </div>
        </div>

        {/* Contenedor envuelto para soportar el guardado si se está editando */}
        <form onSubmit={handleGuardarCambios} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Detalles de Contacto (Editables o de Lectura) */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" /> Detalles de Contacto
                </h3>
                {editando && (
                  <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2.5 py-1 rounded-md">
                    Modo Edición Activo
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                
                {/* Correo */}
                <div>
                  <span className="font-medium text-slate-400 text-xs uppercase tracking-wider block mb-1">Correo electrónico</span>
                  {editando ? (
                    <input 
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  ) : (
                    <p className="text-slate-800 font-medium">{cliente.email || cliente.correo || "No registrado"}</p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <span className="font-medium text-slate-400 text-xs uppercase tracking-wider block mb-1">Teléfono</span>
                  {editando ? (
                    <input 
                      name="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-slate-800 font-medium">{cliente.telefono || "No registrado"}</p>
                  )}
                </div>

                {/* Preferencia de contacto */}
                <div>
                  <span className="font-medium text-slate-400 text-xs uppercase tracking-wider block mb-1">Preferencia de contacto</span>
                  {editando ? (
                    <select 
                      name="preferencia"
                      value={form.preferencia}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="correo">Correo</option>
                      <option value="telefono">Teléfono</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  ) : (
                    <p className="text-slate-800 font-medium uppercase">{cliente.preferencia || "Correo"}</p>
                  )}
                </div>

                {/* Empresa */}
                <div>
                  <span className="font-medium text-slate-400 text-xs uppercase tracking-wider block mb-1">Empresa / Razón Social</span>
                  {editando ? (
                    <input 
                      name="empresa"
                      value={form.empresa}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Tech Solutions"
                    />
                  ) : (
                    <p className="text-slate-800 font-medium">{cliente.empresa || "Particular"}</p>
                  )}
                </div>

                {/* Nombre de Contacto (extra si se quiere editar el nombre principal) */}
                {editando && (
                  <div className="sm:col-span-2">
                    <span className="font-medium text-slate-400 text-xs uppercase tracking-wider block mb-1">Nombre / Contacto Principal</span>
                    <input 
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}

              </div>

              {/* Botón de Guardar que aparece solo al editar */}
              {editando && (
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditando(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Guardar Cambios
                  </button>
                </div>
              )}
            </div>

            {/* Servicios Activos */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Wrench className="w-4 h-4 text-blue-600" /> Servicios Activos
              </h3>
              {cliente.servicios && cliente.servicios.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cliente.servicios.map((s, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{typeof s === "object" ? s.nombre : s}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No hay servicios específicos asociados a este cliente.</p>
              )}
            </div>

            {/* Contrato y Administración */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" /> Contrato y Administración
                </h3>
                <button 
                  type="button"
                  onClick={() => navigate(`/administracion/contratos/editar/${cliente.id}`)}
                  className="px-3 py-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition cursor-pointer"
                >
                  Renovar / Actualizar Contrato
                </button>
              </div>

              {contrato ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-400 text-xs block">ID Contrato</span>
                    <strong className="text-slate-800">{contrato.id}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Fecha de Inicio</span>
                    <strong className="text-slate-800">{contrato.fecha_inicio || contrato.inicio || "No especificada"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Estado</span>
                    <strong className="text-emerald-600">{contrato.estado || "Activo"}</strong>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No hay contrato sincronizado o está pendiente de enlace con el módulo de Administración.</p>
              )}

              <div className="pt-2">
                <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> Historial de Facturación (Próximamente)</span>
                  <span className="italic">Sin facturas emitidas</span>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Lateral */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <UserCheck className="w-4 h-4 text-indigo-600" /> Técnico Asignado
              </h3>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm space-y-2">
                <p className="text-slate-600"><strong>Técnico actual:</strong> <span className="text-slate-400 italic">Sin asignar</span></p>
                <div className="flex gap-2 pt-2">
                  <button type="button" className="w-full py-1.5 px-3 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
                    Asignar / Cambiar Técnico
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Calendar className="w-4 h-4 text-blue-600" /> Citas Programadas
              </h3>
              <div className="p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50 text-center text-sm text-slate-400 space-y-2">
                <Calendar className="w-6 h-6 mx-auto text-slate-300" />
                <p className="text-xs">No hay citas registradas para este cliente.</p>
                <button type="button" className="mt-2 py-1 px-3 text-xs font-medium bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-100 transition shadow-sm cursor-pointer">
                  + Agendar Cita
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Bell className="w-4 h-4 text-amber-500" /> Alertas
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 text-center">
                Sin alertas activas.
              </div>
            </div>

          </div>

        </form>
      </main>
    </div>
  );
}