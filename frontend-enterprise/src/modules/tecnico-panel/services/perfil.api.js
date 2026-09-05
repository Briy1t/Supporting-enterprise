const API_URL = "http://localhost:8001";

export async function getMiPerfil(tecnicoId) {
  const res = await fetch(`${API_URL}/tecnicos/${tecnicoId}`);
  if (!res.ok) throw new Error("Error al cargar perfil");
  return res.json();
}
