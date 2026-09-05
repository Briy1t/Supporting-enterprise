const API_URL = "http://localhost:8001";

export async function getMisTickets(tecnicoId) {
  const res = await fetch(`${API_URL}/tecnicos/${tecnicoId}/tickets`);
  if (!res.ok) throw new Error("Error al cargar tickets");
  return res.json();
}
