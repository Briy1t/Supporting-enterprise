import { useEffect, useState } from "react";
import { getClientesTecnico } from "../services/clientes.api";

export default function useClientesTecnico(id) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await getClientesTecnico(id);
        setClientes(data);
      } catch (err) {
        setError("Error al cargar los clientes asignados al técnico");
      } finally {
        setLoading(false);
      }
    }

    fetchClientes();
  }, [id]);

  return { clientes, loading, error };
}
