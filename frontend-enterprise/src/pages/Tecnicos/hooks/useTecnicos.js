import { useEffect, useState } from "react";
import { getTecnicos } from "../services/tecnicos.api";

export default function useTecnicos() {
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTecnicos().then((data) => {
      setTecnicos(data);
      setLoading(false);
    });
  }, []);

  return { tecnicos, loading };
}
