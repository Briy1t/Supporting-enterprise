import LeadCard from "./LeadCard";

export default function Column({ titulo, estado, leads, cambiarEstado, descartar }) {
  return (
    <div className="kanban-column">
      <h3>{titulo}</h3>

      {leads.length === 0 ? (
        <p className="empty">Sin registros</p>
      ) : (
        leads.map(lead => (
          <LeadCard
            key={lead.id}
            lead={lead}
            cambiarEstado={cambiarEstado}
            descartar={descartar}
          />
        ))
      )}
    </div>
  );
}
