import { useEffect, useState } from "react";
import { getMiCalendario } from "../services/calendario.api";

export default function useMiCalendario(tecnicoId) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCalendario() {
      try {
        const data = await getMiCalendario(tecnicoId);
        setEventos(data);
      } catch (err) {
        setError("Error al cargar tu calendario");
      } finally {
        setLoading(false);
      }
    }
    fetchCalendario();
  }, [tecnicoId]);

  return { eventos, loading, error };
}
