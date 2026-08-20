import { useEffect, useState } from "react";
import Column from "./Column";

export default function Kanban() {
  const [leads, setLeads] = useState([]);

  const cargarLeads = () => {
    fetch("http://localhost:8001/admin/forms")
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error("Error cargando leads:", err));
  };

  useEffect(() => {
    cargarLeads();
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    await fetch(`http://localhost:8001/admin/forms/${id}/estado?estado=${nuevoEstado}`, {
      method: "PATCH"
    });

    cargarLeads();
  };

  const descartar = async (id) => {
    await fetch(`http://localhost:8001/admin/forms/${id}/descartar`, {
      method: "POST"
    });

    cargarLeads();
  };

  const columnas = [
    { titulo: "Pendientes", estado: "pendiente" },
    { titulo: "Llamados", estado: "llamado" },
    { titulo: "Esperando Respuesta", estado: "esperando_respuesta" },
    { titulo: "Aceptados", estado: "aceptado" },
    { titulo: "Convertidos", estado: "convertido" },
    { titulo: "Descartados", estado: "descartado" }
  ];

  return (
    <div className="kanban-container">
      {columnas.map(col => (
        <Column
          key={col.estado}
          titulo={col.titulo}
          estado={col.estado}
          leads={leads.filter(l => l.estado === col.estado)}
          cambiarEstado={cambiarEstado}
          descartar={descartar}
        />
      ))}
    </div>
  );
}
