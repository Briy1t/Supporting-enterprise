import Kanban from "./Kanban";
import "../../styles/administracion2.css";

export default function Administracion() {
  return (
    <div className="page admin-page">
      <h1 className="page-title">Administración - SUPPORTING 🫴</h1>

      <section className="admin-section">
        <h2 className="section-title">Solicitudes</h2>
        <p className="section-desc">
          Gestiona los clientes interesados según su estado comercial.
        </p>

        <Kanban />
      </section>

      <div className="volver-container">
        <button className="btn-volver" onClick={() => window.history.back()}>
          ← Volver
        </button>
      </div>
    </div>
  );
}
