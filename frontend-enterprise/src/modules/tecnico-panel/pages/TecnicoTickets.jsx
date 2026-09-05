import useMisTickets from "../hooks/useMisTickets";

export default function TecnicoTickets() {
  const tecnicoId = 1; // luego vendrá del login
  const { tickets, loading, error } = useMisTickets(tecnicoId);

  if (loading) return <p>Cargando tickets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mis Tickets</h1>
      <pre>{JSON.stringify(tickets, null, 2)}</pre>
    </div>
  );
}
