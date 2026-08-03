import { useState } from "react";
import "../styles/administracion2.css";

export default function CrearCliente() {

  // Obtener datos precargados desde la URL
  const params = new URLSearchParams(window.location.search);

  const [form, setForm] = useState({
    empresa: params.get("empresa") || "",
    contacto: params.get("contacto") || "",
    correo: params.get("correo") || "",
    mensaje: params.get("mensaje") || "",
    usuario: "",
    clave: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Cliente creado correctamente");
  };

  return (
    <div className="page">
      <h1 className="page-title">Crear Cliente</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="empresa"
          placeholder="Empresa"
          value={form.empresa}
          onChange={handleChange}
        />

        <input
          name="contacto"
          placeholder="Contacto"
          value={form.contacto}
          onChange={handleChange}
        />

        <input
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />

        <textarea
          name="mensaje"
          placeholder="Mensaje"
          value={form.mensaje}
          onChange={handleChange}
        />

        <input
          name="usuario"
          placeholder="Nombre de Usuario"
          value={form.usuario}
          onChange={handleChange}
        />

        <input
          name="clave"
          type="password"
          placeholder="Contraseña"
          value={form.clave}
          onChange={handleChange}
        />

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
