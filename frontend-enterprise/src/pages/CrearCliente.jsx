import { useState } from "react";
import "../styles/administracion2.css";

export default function CrearCliente() {
  const params = new URLSearchParams(window.location.search);

  const [form, setForm] = useState({
    empresa: params.get("empresa") || "",
    contacto: params.get("contacto") || "",
    correo: params.get("correo") || "",
    mensaje: params.get("mensaje") || "",
    lead_id: params.get("lead_id") || null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8001/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Cliente creado correctamente");

    // Eliminar el lead automáticamente
    if (form.lead_id) {
      await fetch(`http://localhost:8001/leads/${form.lead_id}`, {
        method: "DELETE"
      });
    }

    window.location.href = "/administracion";
  };

  return (
    <div className="page">
      <h1 className="page-title">Crear Cliente</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="empresa" value={form.empresa} onChange={handleChange} />
        <input name="contacto" value={form.contacto} onChange={handleChange} />
        <input name="correo" value={form.correo} onChange={handleChange} />
        <textarea name="mensaje" value={form.mensaje} onChange={handleChange} />

        <button className="btn-primary">Guardar</button>
      </form>

      <div className="volver-container">
        <button className="btn-volver" onClick={() => window.history.back()}>
          ← Volver
        </button>
      </div>
    </div>
  );
}
