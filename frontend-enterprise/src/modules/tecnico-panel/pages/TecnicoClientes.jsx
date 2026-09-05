import useMisClientes from "../hooks/useMisClientes";

export default function TecnicoClientes() {
  const tecnicoId = 1;
  const { clientes, loading, error } = useMisClientes(tecnicoId);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mis Clientes</h1>
      <pre>{JSON.stringify(clientes, null, 2)}</pre>
    </div>
  );
}
