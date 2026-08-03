import { useState } from "react";
import "../styles/servicios.css";

export default function Servicios() {

  // Estadísticas temporales (luego vendrán de la API)
  const [stats] = useState({
    soporte: 12,
    hardening: 7,
    monitorizacion: 15
  });

  return (
    <div className="page">
      <h1 className="page-title">Servicios Profesionales - SUPPORTING 🫴</h1>

      {/* SERVICIOS */}
      <section className="section">
        <h2 className="section-title">Servicios Disponibles</h2>
        <p className="section-desc">
          Soluciones empresariales ofrecidas por el equipo SUPPORTING.
        </p>

        <div className="cards">
          <div className="card">
            <h3>Soporte IT</h3>
            <p>Gestión, mantenimiento y resolución de incidencias con tiempos de respuesta garantizados.</p>
          </div>

          <div className="card">
            <h3>Hardening</h3>
            <p>Endurecimiento de servidores, sistemas y redes para máxima seguridad.</p>
          </div>

          <div className="card">
            <h3>Monitorización 24/7</h3>
            <p>Supervisión continua de infraestructura, alertas y análisis preventivo.</p>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="section">
        <h2 className="section-title">Estadísticas de Clientes</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Soporte IT</h3>
            <p className="stat-number">{stats.soporte}</p>
            <span>Clientes activos</span>
          </div>

          <div className="stat-card">
            <h3>Hardening</h3>
            <p className="stat-number">{stats.hardening}</p>
            <span>Clientes activos</span>
          </div>

            <div className="stat-card">
              <h3>Monitorización 24/7</h3>
              <p className="stat-number">{stats.monitorizacion}</p>
              <span>Clientes activos</span>
            </div>
          </div>

          <div className="volver-container">
            <button className="btn-volver" onClick={() => window.history.back()}>
              ← Volver
            </button>
          </div>
      </section>
    </div>
  );
}
