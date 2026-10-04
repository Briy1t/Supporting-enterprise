export async function crearCita(tecnicoId, data) {
  const res = await fetch(`http://localhost:8001/tecnicos/${tecnicoId}/citas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear cita");
  }

  return await res.json();
}
