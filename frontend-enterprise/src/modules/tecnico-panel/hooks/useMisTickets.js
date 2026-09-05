import { useEffect, useState } from "react";
import { getMisTickets } from "../services/tickets.api";
// import { useAuth } from "../../auth/useAuth";

export default function useMisTickets(tecnicoId) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await getMisTickets(tecnicoId);
        setTickets(data);
      } catch (err) {
        setError("Error al cargar tus tickets");
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [tecnicoId]);

  return { tickets, loading, error };
}
