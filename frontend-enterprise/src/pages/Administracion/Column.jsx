import LeadCard from "./LeadCard";

export default function Column({ titulo, badgeStyle, leads, cambiarEstado, descartar }) {
  return (
    <div className="w-80 min-w-[320px] bg-slate-100/70 p-4 rounded-xl border border-slate-200/60 flex flex-col gap-3">
      {/* Header de la columna */}
      <div className="flex items-center justify-between px-1">
        <h3 className="font-semibold text-sm text-slate-700">{titulo}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${badgeStyle}`}>
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
            />
          ))
        )}
      </div>
    </div>
  );
}