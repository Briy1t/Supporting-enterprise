import { useState } from "react";
import "../styles/alertas.css";

export default function Alertas() {

  // Datos temporales (luego vendrán de la API)
  const [alertas] = useState([
    {
      id: 1,
      cliente: "TechCorp",
      tipo: "CPU Alta",
      severidad: "Alta",
      fecha: "2026-08-03 14:22",
      descripcion: "Uso de CPU superior al 90% durante 5 minutos."
    },
    {
      id: 2,
      cliente: "DataSolutions",
      tipo: "Intento de acceso",
      severidad: "Media",
      fecha: "2026-08-03 11:05",
      descripcion: "Intento de acceso no autorizado detectado."
    },
    {
      id: 3,
      cliente: "NetGroup",
      tipo: "Pérdida de paquetes",
      severidad: "Alta",
      fecha: "2026-08-02 22:10",
      descripcion: "Pérdida de paquetes superior al 30%."
    }
  ]);

  return (
    <div className="page admin-page">
      <h1 className="page-title">Alertas del Sistema - SUPPORTING 🫴</h1>

      {/* FILTRO */}
      <section className="admin-section">
        <h2 className="section-title">Buscar Alertas</h2>
        <p className="section-desc">Filtra por cliente, tipo o severidad.</p>

        <input
          type="text"
          className="alert-search"
          placeholder="Buscar alertas..."
        />
      </section>

      {/* TABLA DE ALERTAS */}
      <section className="admin-section">
        <h2 className="section-title">Historial de Alertas</h2>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Severidad</th>
                <th>Fecha</th>
                <th>Descripción</th>
              </tr>
            </thead>

            <tbody>
              {alertas.map((a) => (
                <tr key={a.id}>
                  <td>{a.cliente}</td>
                  <td>{a.tipo}</td>
                  <td>{a.severidad}</td>
                  <td>{a.fecha}</td>
                  <td>{a.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="admin-section">
        <h2 className="section-title">Métricas del Sistema</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total de Alertas</h3>
            <p className="stat-number">{alertas.length}</p>
          </div>

          <div className="stat-card">
            <h3>Alertas Severas</h3>
            <p className="stat-number">
              {alertas.filter(a => a.severidad === "Alta").length}
            </p>
          </div>

          <div className="stat-card">
            <h3>Clientes Afectados</h3>
            <p className="stat-number">
              {new Set(alertas.map(a => a.cliente)).size}
            </p>
          </div>
        </div>
      </section>

      {/* PATRONES */}
      <section className="admin-section">
        <h2 className="section-title">Patrones Detectados</h2>

        <div className="pattern-box">
          <p>• Incremento de alertas de CPU en horas pico (14:00 - 16:00)</p>
          <p>• Intentos de acceso no autorizado desde la misma IP</p>
          <p>• Pérdida de paquetes recurrente en clientes con infraestructura antigua</p>
        </div>
      </section>

      {/* BOTÓN VOLVER */}
      <div className="volver-container">
        <button className="btn-volver" onClick={() => window.history.back()}>
          ← Volver
        </button>
      </div>
    </div>
  );
}
