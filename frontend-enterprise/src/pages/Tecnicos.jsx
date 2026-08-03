import "../styles/administracion2.css";

export default function Tecnicos() {
  const tecnicos = [
    {
      id: 1,
      nombre: "Laura Martínez",
      especialidad: "Especialista en Soporte IT",
      descripcion: "Resolución de incidencias, mantenimiento y asistencia remota."
    },
    {
      id: 2,
      nombre: "Carlos Gómez",
      especialidad: "Ingeniero de Hardening",
      descripcion: "Endurecimiento de servidores, seguridad avanzada y auditorías."
    },
    {
      id: 3,
      nombre: "Andrea Ruiz",
      especialidad: "Analista de Monitorización",
      descripcion: "Supervisión 24/7, alertas inteligentes y análisis predictivo."
    },
    {
      id: 4,
      nombre: "Javier Torres",
      especialidad: "Administrador de Redes",
      descripcion: "Gestión de infraestructura, firewalls y conectividad."
    }
  ];

  return (
    <div className="page admin-page">
      <h1 className="page-title">Técnicos Disponibles - SUPPORTING 🫴</h1>

      <section className="admin-section">
        <h2 className="section-title">Equipo Técnico</h2>
        <p className="section-desc">
          Técnicos registrados en la plataforma SUPPORTING.
        </p>

        <div className="cards">
          {tecnicos.map((t) => (
            <div className="card" key={t.id}>
              <h3>{t.nombre}</h3>
              <p>{t.especialidad}</p>
              <p>{t.descripcion}</p>

              <button className="btn-small">Editar</button>
              <button className="btn-small">Desactivar</button>
            </div>
          ))}
        </div>
      </section>

      <div className="volver-container">
        <button className="btn-volver" onClick={() => window.history.back()}>
          ← Volver
        </button>
      </div>
    </div>
  );
}
