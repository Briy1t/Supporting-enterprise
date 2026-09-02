import LeadCard from "./LeadCard";

export default function Column({ 
  titulo, 
  badgeStyle, 
  leads, 
  cambiarEstado, 
  descartar,
  convertirACliente 
}) {
  return (
    <div className="tw-kanban-column">
      {/* Header de la columna */}
      <div className="tw-kanban-title-container">
        <h3 className="tw-kanban-title">{titulo}</h3>
        <span className={`tw-kanban-counter ${badgeStyle}`}>
          {leads.length}
        </span>
      </div>

      {/* Tarjetas o mensaje vacío */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
        {leads.length === 0 ? (
          <div className="p-4 text-center border-2 border-dashed border-slate-200 rounded-lg text-xs text-slate-400 font-medium">
            Sin registros
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              cambiarEstado={cambiarEstado}
              descartar={descartar}
              convertirACliente={convertirACliente}
            />
          ))
        )}
      </div>
    </div>
  );
}
