export default function KanbanTickets({ tickets }) {
  const columnas = {
    pendiente: tickets.filter(t => t.estado === "pendiente"),
    en_curso: tickets.filter(t => t.estado === "en_curso"),
    resuelto: tickets.filter(t => t.estado === "resuelto"),
  };

  return (
    <div className="tw-kanban">
      {Object.entries(columnas).map(([estado, lista]) => (
        <div key={estado} className="tw-kanban-column">
          <h3>{estado}</h3>
          {lista.map(t => (
            <div key={t.id} className="tw-kanban-card">
              <p>#{t.id} - {t.titulo}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
