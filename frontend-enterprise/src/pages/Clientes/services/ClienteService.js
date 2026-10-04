const API_URL = "http://localhost:8001";

export const ClienteService = {
  obtenerClientes: async () => {
    const res = await fetch(`${API_URL}/clientes`);
    if (!res.ok) throw new Error("Error al obtener los clientes");
    return res.json();
  },

  obtenerClientePorId: async (id) => {
    const res = await fetch(`${API_URL}/clientes/${id}`);
    if (!res.ok) throw new Error("Error al obtener el cliente");
    return res.json();
  },

  crearCliente: async (datosCliente) => {
    const res = await fetch(`${API_URL}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosCliente),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.detail || "Error al crear el cliente");
    }
    return res.json();
  },

  actualizarCliente: async (id, datosCliente) => {
    const res = await fetch(`${API_URL}/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosCliente),
    });
    if (!res.ok) throw new Error("Error al actualizar el cliente");
    return res.json();
  }
};