export default function ModalConfirmacion({ accion, correoEnvio, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 animate-scaleIn">
        
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 text-center">
            Confirmar acción
          </h2>

          {accion === "enviar" && (
            <p className="text-sm text-slate-700 text-center">
              ¿Deseas enviar el contrato al correo<br />
              <span className="font-semibold text-blue-600">{correoEnvio}</span>?
            </p>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold bg-slate-200 hover:bg-slate-300 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
