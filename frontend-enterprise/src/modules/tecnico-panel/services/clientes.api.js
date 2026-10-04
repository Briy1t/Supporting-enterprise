const API_URL = "http://localhost:8001";

export async function getMisClientes(tecnicoId) {
  const res = await fetch(`${API_URL}/tecnicos/${tecnicoId}/clientes`);
  if (!res.ok) throw new Error("Error al cargar clientes");
  return res.json();
}
