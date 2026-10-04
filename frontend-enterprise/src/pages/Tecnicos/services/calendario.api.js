export async function getCalendarioTecnico(id) {
  const res = await fetch(`http://localhost:8001/tecnicos/${id}/calendario`);
  return await res.json();
}
