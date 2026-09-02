import { useEffect, useState } from "react";
import Column from "./Column";

export default function Kanban() {
  const [leads, setLeads] = useState([]);

  const cargarLeads = () => {
    fetch("http://localhost:8001/admin/forms/")
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.error("Error cargando leads:", err));
  };

  useEffect(() => {
    cargarLeads();

    const ws = new WebSocket("ws://localhost:8001/admin/forms/ws");

    ws.onopen = () => {
      console.log("WebSocket conectado al Kanban");
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.event === "NUEVO_LEAD") {
          setLeads((prev) => {
            const existe = prev.some((l) => l.id === payload.data.id);
            return existe ? prev : [payload.data, ...prev];
          });
        }
      } catch (err) {
        console.error("Error procesando mensaje de WebSocket:", err);
      }
    };

    ws.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    return () => ws.close();
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    await fetch(`http://localhost:8001/admin/forms/${id}/estado?estado=${nuevoEstado}`, {
      method: "PATCH",
    });
    cargarLeads();
  };

  const descartar = async (id) => {
    await fetch(`http://localhost:8001/admin/forms/${id}/descartar`, {
      method: "POST",
    });
    cargarLeads();
  };

  const columnas = [
    { titulo: "Pendientes", estado: "pendiente", badge: "bg-slate-100 text-slate-700" },
    { titulo: "Llamados", estado: "llamado", badge: "bg-blue-50 text-blue-700" },
    { titulo: "Esperando Respuesta", estado: "esperando_respuesta", badge: "bg-amber-50 text-amber-700" },
    { titulo: "Aceptados", estado: "aceptado", badge: "bg-emerald-50 text-emerald-700" },
  ];

  return (
    <div className="tw-kanban-container">
      {columnas.map((col) => (
        <Column
          key={col.estado}
          titulo={col.titulo}
          estado={col.estado}
          badgeStyle={col.badge}
          leads={leads.filter((l) => l.estado === col.estado)}
          cambiarEstado={cambiarEstado}
          descartar={descartar}
        />
      ))}
    </div>
  );
}
