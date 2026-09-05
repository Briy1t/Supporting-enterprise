import { useEffect, useState } from "react";
import { getMisAlertas } from "../services/alertas.api";

export default function useMisAlertas(tecnicoId) {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlertas() {
      try {
        const data = await getMisAlertas(tecnicoId);
        setAlertas(data);
      } catch (err) {
        setError("Error al cargar tus alertas");
      } finally {
        setLoading(false);
      }
    }
    fetchAlertas();
  }, [tecnicoId]);

  return { alertas, loading, error };
}
