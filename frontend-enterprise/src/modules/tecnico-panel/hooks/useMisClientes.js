import { useEffect, useState } from "react";
import { getMisClientes } from "../services/clientes.api";

export default function useMisClientes(tecnicoId) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await getMisClientes(tecnicoId);
        setClientes(data);
      } catch (err) {
        setError("Error al cargar tus clientes");
      } finally {
        setLoading(false);
      }
    }
    fetchClientes();
  }, [tecnicoId]);

  return { clientes, loading, error };
}
