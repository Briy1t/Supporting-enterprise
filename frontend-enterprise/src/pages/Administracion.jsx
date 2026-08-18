import { useState, useEffect } from "react";
import "../styles/administracion2.css";

export default function Administracion() {
  const [formularios, setFormularios] = useState([]);

  const cargarFormularios = () => {
    fetch("http://localhost:8001/admin/forms")
      .then(res => res.json())
      .then(data => setFormularios(data))
      .catch(err => console.error("Error cargando formularios:", err));
  };

  useEffect(() => {
    cargarFormularios();
  }, []);

  const descartarSolicitud = async (form) => {
    await fetch(`http://localhost:8001/admin/forms/${form.id}/descartar`, {
      method: "POST"
    });

    cargarFormularios(); 
  };

  const cambiarEstado = async (form, nuevoEstado) => {
    await fetch(`http://localhost:8001/admin/forms/${form.id}/estado?estado=${nuevoEstado}`, {
      method: "PATCH"
    });

    cargarFormularios();
  };

  return (
    <div className="page admin-page">
      <h1 className="page-title">Administración - SUPPORTING 🫴</h1>

      <section className="admin-section">
        <h2 className="section-title">Solicitudes de Clientes</h2>
        <p className="section-desc">
          Clientes que han contactado desde la web y están pendientes de revisión.
        </p>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Contacto</th>
                <th>Correo</th>
                <th>Mensaje</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {formularios.length === 0 ? (
                <tr>
                  <td colSpan="6">No hay solicitudes pendientes</td>
                </tr>
              ) : (
                formularios.map((form) => (
                  <tr key={form.id}>
                    <td>{form.empresa}</td>
                    <td>{form.contacto}</td>
                    <td>{form.correo}</td>
                    <td>{form.mensaje}</td>
                    <td>{form.estado}</td>

                    <td>
                      <button
                        className="btn-small"
                        onClick={() =>
                          window.location.href =
                            `/crear-cliente?empresa=${form.empresa}&contacto=${form.contacto}&correo=${form.correo}&mensaje=${form.mensaje}&form_id=${form.id}&form_tipo=lead`
                        }
                      >
                        Crear Usuario
                      </button>

                      <button
                        className="btn-small"
                        onClick={() => cambiarEstado(form, "Contactado")}
                      >
                        Contactado
                      </button>

                      <button
                        className="btn-small"
                        onClick={() => cambiarEstado(form, "En_proceso")}
                      >
                        En Proceso
                      </button>

                      <button
                        className="btn-small"
                        onClick={() => cambiarEstado(form, "Confirmado")}
                      >
                        Confirmado
                      </button>

                      <button
                        className="btn-small btn-danger"
                        onClick={() => descartarSolicitud(form)}
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

      <div className="volver-container">
        <button className="btn-volver" onClick={() => window.history.back()}>
          ← Volver
        </button>
      </div>
    </div>
  );
}
