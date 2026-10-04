import { useEffect, useState } from "react";

export default function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const res = await fetch("http://localhost:8001/clientes");
        const data = await res.json();
        setClientes(data);
      } catch (err) {
        setError("Error al cargar los clientes");
      } finally {
        setLoading(false);
      }
    }

    fetchClientes();
  }, []);

  return { clientes, loading, error };
}
