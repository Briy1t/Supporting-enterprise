import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ServicioForm from "./ServicioForm";
import ServicioCard from "./ServicioCard";
import ModalConfirmacion from "./ModalConfirmacion";
import { Plus, ArrowLeft } from "lucide-react";

export default function ServiciosPage() {
  const [servicios, setServicios] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [servicioEditar, setServicioEditar] = useState(null);
  const [modal, setModal] = useState({ visible: false, accion: null, servicio: null });

  const cargarServicios = async () => {
    const res = await fetch("http://localhost:8001/servicios");
    const data = await res.json();
    setServicios(data);
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  const abrirCrear = () => {
    setServicioEditar(null);
    setMostrarForm(true);
  };

  const abrirEditar = (servicio) => {
    setServicioEditar(servicio);
    setMostrarForm(true);
  };

  const abrirEliminar = (servicio) => {
    setModal({ visible: true, accion: "eliminar", servicio });
  };

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6">
        {/* CABECERA */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              <span className="tw-brand-icon"></span> Gestión de Servicios
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Administra, actualiza y organiza los servicios empresariales con precisión y control.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={abrirCrear}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Crear Servicio
            </button>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Volver
            </button>
          </div>
        </div>

        {/* GRID DE SERVICIOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((s) => (
            <ServicioCard
              key={s.id}
              servicio={s}
              onEditar={() => abrirEditar(s)}
              onEliminar={() => abrirEliminar(s)}
            />
          ))}
        </div>

        {/* FORMULARIO */}
        {mostrarForm && (
          <ServicioForm
            servicio={servicioEditar}
            onClose={() => setMostrarForm(false)}
            onSave={() => {
              setMostrarForm(false);
              cargarServicios();
            }}
          />
        )}

        {/* MODAL ELIMINAR */}
        {modal.visible && (
          <ModalConfirmacion
            accion={modal.accion}
            servicio={modal.servicio}
            onClose={() => setModal({ visible: false })}
            onConfirm={async () => {
              await fetch(`http://localhost:8001/servicios/${modal.servicio.id}`, {
                method: "DELETE",
              });
              setModal({ visible: false });
              cargarServicios();
            }}
          />
        )}
      </main>
    </div>
  );
}