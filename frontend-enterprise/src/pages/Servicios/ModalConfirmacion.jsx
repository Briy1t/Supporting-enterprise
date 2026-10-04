export default function ModalConfirmacion({ accion, servicio, leadId, onClose, onConfirm }) {
  const ejecutarAccionDefault = async () => {
    if (leadId) {
      await fetch(`http://localhost:8001/contratos-generar/enviar/${leadId}`, {
        method: "POST",
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Confirmar acción</h2>

        <p className="text-sm text-slate-600">
          ¿Seguro que deseas {accion}{" "}
          {servicio ? <strong>{servicio.nombre}</strong> : "el contrato"}?
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onConfirm || ejecutarAccionDefault}
            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition"
          >
            Sí, confirmar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}