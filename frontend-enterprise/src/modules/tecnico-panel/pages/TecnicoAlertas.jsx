import useMisAlertas from "../hooks/useMisAlertas";

export default function TecnicoAlertas() {
  const tecnicoId = 1;
  const { alertas, loading, error } = useMisAlertas(tecnicoId);

  if (loading) return <p>Cargando alertas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mis Alertas</h1>
      <pre>{JSON.stringify(alertas, null, 2)}</pre>
    </div>
  );
}
