import { useState } from "react";

export default function useCitasTecnico(tecnicoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function crearCita({ clienteId, fechaCita, motivo }) {
    setLoading(true);
    setError(null);

    try {
      // Convertir datetime-local → ISO completo sin UTC
      const fechaISO = fechaCita.includes(":")
        ? fechaCita + ":00"
        : fechaCita;

      const payload = {
        cliente_id: Number(clienteId),
        fecha: fechaISO,
        motivo,
        ticket_id: null,
      };

      const res = await fetch(
        `http://localhost:8001/tecnicos/${tecnicoId}/citas`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Error al crear la cita");
      }

      return await res.json();
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    crearCita,
    loading,
    error,
  };
}
