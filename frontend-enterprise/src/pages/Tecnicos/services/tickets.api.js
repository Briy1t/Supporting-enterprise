export async function getTicketsTecnico(id) {
  const res = await fetch(`http://localhost:8001/tecnicos/${id}/tickets`);
  return await res.json();
}
