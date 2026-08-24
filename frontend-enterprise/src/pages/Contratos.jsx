import { useState, useEffect } from "react";
import "../styles/administracion2.css";

export default function Contratos() {
  const params = new URLSearchParams(window.location.search);
  const leadId = params.get("lead");

  const [lead, setLead] = useState(null);
  const [contrato, setContrato] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [duracion, setDuracion] = useState("");
  const [politicas, setPoliticas] = useState("");
  const [empresa, setEmpresa] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8001/leads/${leadId}`)
      .then(res => res.json())
      .then(data => {
        setLead(data);
        setEmpresa(data.empresa || "");
      });

    fetch(`http://localhost:8001/contratos/${leadId}`)
      .then(res => res.json())
      .then(data => {
        setContrato(data.contrato || null);
        setHistorial(data.historial || []);
      });
  }, [leadId]);

  const generarContrato = async () => {
    await fetch(`http://localhost:8001/contratos/generar/${leadId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        servicios,
        duracion,
        politicas
      })
    });

    window.location.reload();
  };

  const enviarContrato = async () => {
    await fetch(`http://localhost:8001/contratos/enviar/${leadId}`, {
      method: "POST"
    });

    window.location.reload();
  };

  const subirContratoFirmado = async (e) => {
    const archivo = e.target.files[0];
    const formData = new FormData();
    formData.append("archivo", archivo);

    await fetch(`http://localhost:8001/contratos/firmado/${leadId}`, {
      method: "POST",
      body: formData
    });

    window.location.reload();
  };

  if (!lead) return <p>Cargando...</p>;

  return (
    <div className="page">
      <h1 className="page-title">Gestión de Contratos</h1>

      <div className="card">
        <h3>Datos del lead</h3>

        <label>Empresa</label>
        <input
          type="text"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />

        <p><strong>Contacto:</strong> {lead.contacto}</p>
        <p><strong>Correo:</strong> {lead.correo}</p>
        <p><strong>Teléfono:</strong> {lead.telefono}</p>
      </div>

      <div className="card">
        <h3>Generar contrato</h3>

        <label>Servicios</label>
        <input
          type="text"
          value={servicios.join(", ")}
          onChange={(e) => setServicios(e.target.value.split(","))}
        />

        <label>Duración</label>
        <select value={duracion} onChange={(e) => setDuracion(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="12 meses">12 meses</option>
          <option value="24 meses">24 meses</option>
          <option value="36 meses">36 meses</option>
        </select>

        <label>Políticas</label>
        <textarea
          value={politicas}
          onChange={(e) => setPoliticas(e.target.value)}
        />

        <button className="btn-small" onClick={generarContrato}>
          Generar contrato
        </button>
      </div>

      <div className="card">
        <h3>Contrato actual</h3>

        {contrato ? (
          <>
            <p><strong>Estado:</strong> {contrato.estado}</p>

            <button className="btn-small" onClick={enviarContrato}>
              Enviar contrato
            </button>

            <label className="btn-small">
              Subir contrato firmado
              <input type="file" hidden onChange={subirContratoFirmado} />
            </label>
          </>
        ) : (
          <p>No hay contrato generado.</p>
        )}
      </div>

      <div className="card">
        <h3>Historial</h3>

        {historial.length === 0 ? (
          <p>No hay historial.</p>
        ) : (
          <ul>
            {historial.map((h, i) => (
              <li key={i}>
                {h.fecha} — {h.accion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="volver-container">
        <button className="btn-volver" onClick={() => window.history.back()}>
          Volver
        </button>
      </div>
    </div>
  );
}
