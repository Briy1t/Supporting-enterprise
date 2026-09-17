import { useEffect, useState } from "react";

export default function useTecnico(id) {
  const [tecnico, setTecnico] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTecnico() {
      const res = await fetch(`http://localhost:8001/tecnicos/${id}`);
      const data = await res.json();
      setTecnico(data);
      setLoading(false);
    }
    fetchTecnico();
  }, [id]);

  return { tecnico, loading };
}
