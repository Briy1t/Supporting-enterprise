import { useEffect, useState } from "react";
import { getTicketsTecnico } from "../services/tickets.api";

export default function useTicketsTecnico(id) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await getTicketsTecnico(id);
        setTickets(data);
      } catch (err) {
        setError("Error al cargar los tickets del técnico");
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, [id]);

  return { tickets, loading, error };
}
