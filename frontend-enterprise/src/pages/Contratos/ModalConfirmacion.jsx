export default function ModalConfirmacion({ accion, leadId, onClose }) {
  const confirmar = async () => {
    await fetch(`http://localhost:8001/contratos-generar/enviar/${leadId}`, {
      method: "POST"
    });

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmar acción</h2>
        <p>¿Seguro que deseas {accion} el contrato?</p>

        <div className="modal-actions">
          <button className="btn-danger" onClick={confirmar}>
            Sí, confirmar
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
