import { useEffect, useState } from "react";
import { getAlertasTecnico } from "../services/alertas.api";

export default function useAlertasTecnico(id) {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlertas() {
      try {
        const data = await getAlertasTecnico(id);
        setAlertas(data);
      } catch (err) {
        setError("Error al cargar las alertas del técnico");
      } finally {
        setLoading(false);
      }
    }

    fetchAlertas();
  }, [id]);

  return { alertas, loading, error };
}
