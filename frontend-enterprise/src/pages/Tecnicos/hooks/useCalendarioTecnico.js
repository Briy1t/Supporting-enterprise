import { useEffect, useState } from "react";
import { getCalendarioTecnico } from "../services/calendario.api";

export default function useCalendarioTecnico(id) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCalendario() {
      try {
        const data = await getCalendarioTecnico(id);
        setEventos(data);
      } catch (err) {
        setError("Error al cargar el calendario del técnico");
      } finally {
        setLoading(false);
      }
    }

    fetchCalendario();
  }, [id]);

  return { eventos, loading, error };
}
