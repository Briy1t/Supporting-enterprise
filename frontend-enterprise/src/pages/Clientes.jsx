import { useState, useEffect } from "react";
import "../styles/clientes.css";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/clientes")
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error("Error cargando clientes:", err));
  }, []);

  return (
    <div className="page clientes-page">
      <h1 className="page-title">Clientes - SUPPORTING 🫴</h1>

      <div className="clientes-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="5">No hay clientes registrados</td>
              </tr>
            ) : (
              clientes.map((c) => (
                <tr key={c.id}>
                  <td>{c.nombre}</td>
                  <td>{c.empresa}</td>
                  <td>{c.servicio}</td>
                  <td>{c.estado}</td>

                  <td>
                    <button
                      className="btn-small"
                      onClick={() => window.location.href = `/clientes/${c.id}`}
                    >
                      Ver
                    </button>

                    <button
                      className="btn-small"
                      onClick={() => window.location.href = `/editar-cliente/${c.id}`}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="volver-container">
        <button className="btn-volver" onClick={() => window.history.back()}>
          ← Volver
        </button>
      </div>
    </div>
  );
}
