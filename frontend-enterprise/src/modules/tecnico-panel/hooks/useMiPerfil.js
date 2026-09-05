import { useEffect, useState } from "react";
import { getMiPerfil } from "../services/perfil.api";

export default function useMiPerfil(tecnicoId) {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const data = await getMiPerfil(tecnicoId);
        setPerfil(data);
      } catch (err) {
        setError("Error al cargar tu perfil");
      } finally {
        setLoading(false);
      }
    }
    fetchPerfil();
  }, [tecnicoId]);

  return { perfil, loading, error };
}
