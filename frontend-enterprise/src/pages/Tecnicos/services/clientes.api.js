export async function getClientesTecnico(id) {
  const res = await fetch(`http://localhost:8001/tecnicos/${id}/clientes`);
  return await res.json();
}
