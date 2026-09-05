const API_URL = "http://localhost:8001";

export async function getMisAlertas(tecnicoId) {
  const res = await fetch(`${API_URL}/tecnicos/${tecnicoId}/alertas`);
  if (!res.ok) throw new Error("Error al cargar alertas");
  return res.json();
}
