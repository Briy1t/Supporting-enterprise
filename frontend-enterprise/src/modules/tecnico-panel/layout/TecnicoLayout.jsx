import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Bell, Calendar, Users, User } from "lucide-react";

export default function TecnicoLayout() {
  return (
    <div className="tw-layout">
      <aside className="tw-sidebar">
        <div className="tw-sidebar-header">Panel Técnico</div>
        <nav className="tw-sidebar-nav">
          <NavLink to="/tecnico/dashboard"><LayoutDashboard /> Dashboard</NavLink>
          <NavLink to="/tecnico/tickets"><ClipboardList /> Mis Tickets</NavLink>
          <NavLink to="/tecnico/alertas"><Bell /> Mis Alertas</NavLink>
          <NavLink to="/tecnico/calendario"><Calendar /> Mi Calendario</NavLink>
          <NavLink to="/tecnico/clientes"><Users /> Mis Clientes</NavLink>
          <NavLink to="/tecnico/perfil"><User /> Mi Perfil</NavLink>
        </nav>
      </aside>
      <main className="tw-layout-content">
        <Outlet />
      </main>
    </div>
  );
}
