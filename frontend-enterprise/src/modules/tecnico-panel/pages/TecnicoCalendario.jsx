import useMiCalendario from "../hooks/useMiCalendario";

export default function TecnicoCalendario() {
  const tecnicoId = 1;
  const { eventos, loading, error } = useMiCalendario(tecnicoId);

  if (loading) return <p>Cargando calendario...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mi Calendario</h1>
      <pre>{JSON.stringify(eventos, null, 2)}</pre>
    </div>
  );
}
