import { useState } from "react";

export default function ServicioForm({ servicio, onClose, onSave }) {
  const [nombre, setNombre] = useState(servicio?.nombre || "");
  const [descripcion, setDescripcion] = useState(servicio?.descripcion || "");
  const [precio, setPrecio] = useState(servicio?.precio || "");

  const guardar = async () => {
    const precioNumber = parseFloat(precio);

    const payload = {
      nombre: nombre || servicio.nombre,
      descripcion: descripcion || servicio.descripcion,
      precio: isNaN(precioNumber) ? servicio.precio : precioNumber,
      activo: servicio?.activo ?? true
    };

    const url = servicio
      ? `http://localhost:8001/servicios/${servicio.id}`
      : "http://localhost:8001/servicios";

    const method = servicio ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    onSave();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
          {servicio ? "Editar Servicio" : "Crear Servicio"}
        </h2>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value ?? "")}
            className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value ?? "")}
            className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white h-24"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Precio (€)</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            step="0.01"
            className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t">
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            onClick={guardar}
          >
            Guardar
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
