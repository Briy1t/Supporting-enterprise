export default function LeadCard({ lead, cambiarEstado, descartar }) {
  return (
    <div className="lead-card">
      <h4>{lead.contacto}</h4>

      <p><strong>Correo:</strong> {lead.correo}→
        <a href={`mailto:${lead.correo}`} className="btn-mail">
        ✉
        </a>
</p>

      {lead.telefono && (
        <p><strong>Teléfono:</strong>  {lead.telefono}
        
        {lead.telefono && (
          <a href={`tel:${lead.telefono}`} className="btn-call">→
            ✆
          </a>
        )}</p>
      )}

      <p><strong>Mensaje:</strong> {lead.mensaje}</p>

      <div className="lead-actions">

        {/* Pipeline */}
        <button onClick={() => cambiarEstado(lead.id, "llamado")}>
          ☎️ Llamado
        </button>

        <button onClick={() => cambiarEstado(lead.id, "esperando_respuesta")}>
          ⌛ Esperando
        </button>

        <button onClick={() => cambiarEstado(lead.id, "aceptado")}>
           ✓  Concretado
        </button>

        <button
          className="btn-small"
          onClick={() => window.location.href = `/contratos?cliente=${lead.id}`}
        >
          📄 Enviar contrato
        </button>

        <button
            onClick={() =>
                window.location.href =
                `/crear-cliente?contacto=${lead.contacto}&correo=${lead.correo}&telefono=${lead.telefono}&lead_id=${lead.id}`
            }
            >
            📄 Crear Cliente
            </button>


        <button className="danger" onClick={() => descartar(lead.id)}>
          🟥 Descartar
        </button>

      </div>
    </div>
  );
}
