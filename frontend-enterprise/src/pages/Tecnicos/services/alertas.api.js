export async function getAlertasTecnico(id) {
  const res = await fetch(`http://localhost:8001/tecnicos/${id}/alertas`);
  return await res.json();
}
