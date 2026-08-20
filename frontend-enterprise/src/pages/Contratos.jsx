import { useState, useEffect } from "react";
import "../styles/administracion2.css";

export default function Contratos() {
  const params = new URLSearchParams(window.location.search);
  const clienteId = params.get("cliente");

  const [cliente, setCliente] = useState(null);
  const [contrato, setContrato] = useState(null);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // Cargar datos del cliente
    fetch(`http://localhost:8001/clientes/${clienteId}`)
      .then(res => res.json())
      .then(data => setCliente(data))
      .catch(err => console.error("Error cargando cliente:", err));

    // Cargar contrato
    fetch(`http://localhost:8001/contratos/${clienteId}`)
      .then(res => res.json())
      .then(data => {
        setContrato(data.contrato || null);
        setHistorial(data.historial || []);
      })
      .catch(() => {});
  }, [clienteId]);

  const subirContrato = async (e) => {
    const archivo = e.target.files[0];
    const formData = new FormData();
    formData.append("archivo", archivo);

    await fetch(`http://localhost:8001/contratos/subir/${clienteId}`, {
      method: "POST",
      body: formData
    });

    alert("Contrato subido correctamente.");
    window.location.reload();
  };

  const marcarEnviado = async () => {
    await fetch(`http://localhost:8001/contratos/enviado/${clienteId}`, {
      method: "POST"
    });

    alert("Contrato marcado como enviado.");
    window.location.reload();
  };

  const marcarFirmado = async () => {
    await fetch(`http://localhost:8001/contratos/firmado/${clienteId}`, {
      method: "POST"
    });

    alert("Contrato marcado como firmado.");
    window.location.reload();
  };

  if (!cliente) return <p>Cargando cliente...</p>;

  return (
    <div className="page">
      <h1 className="page-title">Gestión de Contratos</h1>

      <div className="card">
        <h3>Datos del Cliente</h3>
        <p><strong>Empresa:</strong> {cliente.empresa}</p>
        <p><strong>Contacto:</strong> {cliente.contacto}</p>
        <p><strong>Correo:</strong> {cliente.correo}</p>
        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
      </div>

      <div className="card">
        <h3>Contrato Actual</h3>

        {contrato ? (
          <>
            <p><strong>Estado:</strong> {contrato.estado}</p>
            <a
              href={`http://localhost:8001/contratos/descargar/${clienteId}`}
              className="btn-small"
            >
              📄 Descargar contrato
            </a>
          </>
        ) : (
          <p>No hay contrato subido.</p>
        )}

        <label className="btn-small">
          📤 Subir contrato firmado
          <input type="file" hidden onChange={subirContrato} />
        </label>

        <button className="btn-small" onClick={marcarEnviado}>
          ✉️ Marcar como enviado
        </button>

        <button className="btn-small" onClick={marcarFirmado}>
          ✓ Marcar como firmado
        </button>
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
          ← Volver
        </button>
      </div>
    </div>
  );
}
