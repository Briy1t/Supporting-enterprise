import { useState, useEffect } from "react";
import { ClienteService } from "../services/ClienteService";

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const data = await ClienteService.obtenerClientes();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  return { clientes, cargando, error, recargarClientes: cargarClientes };
}