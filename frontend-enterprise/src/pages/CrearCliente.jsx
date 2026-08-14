import { useState } from "react";
import "../styles/administracion2.css";

export default function CrearCliente() {
  const params = new URLSearchParams(window.location.search);

  const [form, setForm] = useState({
    empresa: params.get("empresa") || "",
    contacto: params.get("contacto") || "",
    correo: params.get("correo") || "",
    mensaje: params.get("mensaje") || "",
    lead_id: params.get("lead_id") || null,
    telefono: "",
    preferencia: "correo",
    servicios: []
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServicios = (e) => {
    const opciones = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setForm({ ...form, servicios: opciones });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8001/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    alert(`
Cliente creado correctamente.

Usuario: ${data.usuario.usuario}
Contraseña temporal: ${data.password_temporal}
`);

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

        <select multiple value={form.servicios} onChange={handleServicios}>
          <option value="hardening">Hardening</option>
          <option value="monitorizacion">Monitorización</option>
          <option value="soporte">Soporte</option>
          <option value="auditoria">Auditoría</option>
        </select>

        <input
          type="text"
          name="telefono"
          placeholder="Número de teléfono"
          value={form.telefono}
          onChange={handleChange}
        />

        <select
          name="preferencia"
          value={form.preferencia}
          onChange={handleChange}
        >
          <option value="correo">Correo</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="llamada">Llamada</option>
        </select>

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
