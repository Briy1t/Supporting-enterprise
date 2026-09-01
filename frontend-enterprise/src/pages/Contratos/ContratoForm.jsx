import { useState } from "react";

export default function ContratoForm({ leadId, serviciosSeleccionados, correoEnvio, onClose }) {
  const [duracion, setDuracion] = useState("12 meses");
  const [politicas, setPoliticas] = useState("");

  const guardar = async () => {
    await fetch(`http://localhost:8001/contratos-generar/generar/${leadId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        servicios: serviciosSeleccionados,
        duracion,
        correo_envio: correoEnvio,
      }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Generar Contrato</h2>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Duración</label>
          <select
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="3 meses">3 meses </option>
            <option value="6 meses">6 meses</option>
            <option value="12 meses">12 meses</option>
            <option value="24 meses">24 meses</option>
            <option value="36 meses">36 meses</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t">
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            onClick={guardar}
          >
            Generar
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}