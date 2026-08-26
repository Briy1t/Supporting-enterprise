import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ContratoForm from "./ContratoForm";
import ContratoCard from "./ContratoCard";
import ModalConfirmacion from "./ModalConfirmacion";
import { ArrowLeft, Send, FilePlus } from "lucide-react";

export default function Contratos() {
  const [lead, setLead] = useState(null);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [correoEnvio, setCorreoEnvio] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modal, setModal] = useState({ visible: false, accion: null });

  const leadId = localStorage.getItem("leadId");

  useEffect(() => {
    fetch(`http://localhost:8001/leads/${leadId}`)
      .then((res) => res.json())
      .then((data) => {
        setLead(data);
        setCorreoEnvio(data.correo);
      });

    fetch("http://localhost:8001/servicios/")
      .then((res) => res.json())
      .then((data) => setServiciosDisponibles(data));
  }, [leadId]);

  const handleServicios = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));
    setServiciosSeleccionados(values);
  };

  return (
    <div className="tw-layout">
      <Sidebar />

      <main className="tw-layout-content space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              <span className="tw-brand-icon"></span> Gestión de Contratos
            </h1>
          </div>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        {lead && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-1">
            <p><strong className="text-slate-800">Contacto:</strong> {lead.contacto}</p>
            <p><strong className="text-slate-800">Correo:</strong> {lead.correo}</p>
            <p><strong className="text-slate-800">Teléfono:</strong> {lead.telefono}</p>
          </div>
        )}

        <div className="space-y-4 max-w-2xl">
          <div>
            <h2 className="text-sm font-bold text-slate-700 mb-1">Seleccionar servicios</h2>
            <select
              multiple
              onChange={handleServicios}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-white h-32"
            >
              {serviciosDisponibles.map((s) => (
                <option key={s.id} value={s.id} className="p-1">
                  {s.nombre} — {s.precio}€
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-700 mb-1">Correo para enviar contrato</h2>
            <input
              type="email"
              value={correoEnvio}
              onChange={(e) => setCorreoEnvio(e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              onClick={() => setMostrarForm(true)}
            >
              <FilePlus className="w-4 h-4" /> Generar contrato
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              onClick={() => setModal({ visible: true, accion: "enviar" })}
            >
              <Send className="w-4 h-4" /> Enviar contrato
            </button>
          </div>
        </div>

        <ContratoCard leadId={leadId} />

        {mostrarForm && (
          <ContratoForm
            leadId={leadId}
            serviciosSeleccionados={serviciosSeleccionados}
            correoEnvio={correoEnvio}
            onClose={() => setMostrarForm(false)}
          />
        )}

        {modal.visible && (
          <ModalConfirmacion
            accion={modal.accion}
            leadId={leadId}
            onClose={() => setModal({ visible: false })}
          />
        )}
      </main>
    </div>
  );
}