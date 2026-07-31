import "../styles/clientes.css";

export default function Clientes() {
  return (
    <div className="page clientes-page">
      <h1 className="page-title">Clientes</h1>


      <div className="clientes-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th>Renovación</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {/* Aquí luego insertamos los datos reales desde la API */}
            <tr>
              <td>Juan Pérez</td>
              <td>TechCorp</td>
              <td>Monitorización</td>
              <td>Activo</td>
              <td>12/09/2026</td>
              <td>
                <button className="btn-small">Ver</button>
                <button className="btn-small">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
