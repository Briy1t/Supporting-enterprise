const API_URL = "http://localhost:8001";

export async function getMiCalendario(tecnicoId) {
  const res = await fetch(`${API_URL}/tecnicos/${tecnicoId}/calendario`);
  if (!res.ok) throw new Error("Error al cargar calendario");
  return res.json();
}

export const listarDisponibilidad = (id) => api.get(`/tecnicos/${id}/disponibilidad`);
export const crearSlot = (id, data) => api.post(`/tecnicos/${id}/disponibilidad`, data);

export const listarCitas = (id) => api.get(`/tecnicos/${id}/citas`);
export const crearCita = (id, data) => api.post(`/tecnicos/${id}/citas`, data);
