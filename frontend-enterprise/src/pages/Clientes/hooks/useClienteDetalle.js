import { useState, useEffect } from "react";
import { ClienteService } from "../services/ClienteService";

export function useClienteDetalle(id) {
  const [cliente, setCliente] = useState(null);
  const [contrato, setContrato] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const cargarDetalle = async () => {
      try {
        setCargando(true);
        const dataCliente = await ClienteService.obtenerClientePorId(id);
        setCliente(dataCliente);

        // Intentar traer el contrato del módulo de administración
        const resContrato = await fetch(`http://localhost:8001/contratos/cliente/${id}`).catch(() => null);
        if (resContrato && resContrato.ok) {
          const dataContrato = await resContrato.json();
          setContrato(dataContrato);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDetalle();
  }, [id]);

  return { cliente, contrato, cargando, error };
}