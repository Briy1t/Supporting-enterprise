import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

export default function Index() {
  return (
    <div className="tw-layout">
      {/* 1. Menú Lateral (Ya incluye navegación e icono) */}
      <Sidebar />

      {/* 2. Contenido Principal */}
      <main className="tw-layout-content">
        {/* El Dashboard maneja de forma limpia el Banner + las Tarjetas */}
        <Dashboard />
      </main>
    </div>
  );
}