import { useState, useEffect } from "react";
import "../styles/administracion2.css";

export default function Administracion() {
  const [leads, setLeads] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Cargar leads desde la plataforma
  useEffect(() => {
    fetch("http://localhost:8001/leads")
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error("Error cargando leads:", err));
  }, []);

  // Cargar usuarios desde la plataforma
  useEffect(() => {
    fetch("http://localhost:8001/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error cargando usuarios:", err));
  }, []);

  const descartarSolicitud = async (leadId) => {
    await fetch(`http://localhost:8001/leads/${leadId}`, {
      method: "DELETE"
    });

    window.location.reload();
  };

  return (
    <div className="page admin-page">
      <h1 className="page-title">Administración - SUPPORTING 🫴</h1>

      {/* Sección: Solicitudes desde la web */}
      <section className="admin-section">
        <h2 className="section-title">Solicitudes de Clientes</h2>
        <p className="section-desc">Clientes que han contactado desde la web y están pendientes de revisión.</p>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Contacto</th>
                <th>Correo</th>
                <th>Mensaje</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="5">No hay solicitudes pendientes</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.empresa}</td>
                    <td>{lead.contacto}</td>
                    <td>{lead.correo}</td>
                    <td>{lead.mensaje}</td>
                    <td>
                      <button
                        className="btn-small"
                        onClick={() =>
                          window.location.href =
                            `/crear-cliente?empresa=${lead.empresa}&contacto=${lead.contacto}&correo=${lead.correo}&mensaje=${lead.mensaje}&lead_id=${lead.id}`
                        }
                      >
                        Crear Usuario
                      </button>

                      <button
                        className="btn-small"
                        onClick={() => descartarSolicitud(lead.id)}
                      >
                        Descartar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sección: Usuarios creados */}
      <section className="admin-section">
        <h2 className="section-title">Usuarios del Sistema</h2>
        <p className="section-desc">Usuarios internos y clientes con acceso a la plataforma.</p>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Empresa</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="5">No hay usuarios registrados</td>
                </tr>
              ) : (
                usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.usuario}</td>
                    <td>{u.rol}</td>
                    <td>{u.empresa}</td>
                    <td>{u.estado}</td>
                    <td>
                      <button className="btn-small">Editar</button>
                      <button className="btn-small">Desactivar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
