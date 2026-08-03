import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditarCliente() {
  const { id } = useParams();
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/clientes/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Cliente actualizado");
  };

  return (
    <div className="page">
      <h1 className="page-title">Editar Cliente</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="empresa" value={form.empresa || ""} onChange={handleChange} />
        <input name="contacto" value={form.contacto || ""} onChange={handleChange} />
        <input name="correo" value={form.correo || ""} onChange={handleChange} />
        <textarea name="mensaje" value={form.mensaje || ""} onChange={handleChange} />

        <button className="btn-primary">Actualizar</button>
      </form>
    </div>
  );
}
