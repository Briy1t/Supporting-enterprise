export async function crearTecnico(data) {
  const res = await fetch("http://localhost:8001/tecnicos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function getTecnicos() {
  const res = await fetch("http://localhost:8001/tecnicos");
  return await res.json();
}

export async function getTecnicoById(id) {
  const res = await fetch(`http://localhost:8001/tecnicos/${id}`);
  return await res.json();
}
export async function eliminarTecnico(id) {
  return await fetch(`http://localhost:8001/tecnicos/${id}`, {
    method: "DELETE",
  });
}
