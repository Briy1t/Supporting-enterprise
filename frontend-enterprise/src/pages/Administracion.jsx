import "../styles/administracion.css";

export default function Administracion() {
  return (
    <div className="page admin-page">
      <h1 className="page-title">Administración</h1>

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
              <tr>
                <td>TechCorp</td>
                <td>Juan Pérez</td>
                <td>juan@techcorp.com</td>
                <td>Interesado en monitorización</td>
                <td>
                  <button className="btn-small">Crear Usuario</button>
                  <button className="btn-small">Descartar</button>
                </td>
              </tr>
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
              <tr>
                <td>jperez</td>
                <td>Cliente</td>
                <td>TechCorp</td>
                <td>Activo</td>
                <td>
                  <button className="btn-small">Editar</button>
                  <button className="btn-small">Desactivar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
