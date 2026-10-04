
export async function crearDisponibilidad(tecnicoId, data) {
  const res = await fetch(`http://localhost:8001/tecnicos/${tecnicoId}/disponibilidad`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear disponibilidad");
  }

  return await res.json();
}
