import { NavLink, Link } from "react-router-dom";
import { Users, Wrench, ShieldCheck, Bell, Settings, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { path: "/clientes", label: "Clientes", icon: Users },
    { path: "/tecnicos", label: "Técnicos", icon: Wrench },
    { path: "/servicios", label: "Servicios", icon: ShieldCheck },
    { path: "/alertas", label: "Alertas", icon: Bell },
    { path: "/administracion", label: "Administración", icon: Settings },
  ];

  return (
    <aside className="tw-sidebar">
      {/* Brand Header */}
      <div className="tw-sidebar-logo">
        <Link to="/" className="flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-blue-500" />
          <span>SUPPORTING</span>
        </Link>
      </div>

      {/* Menú de Navegación */}
      <nav>
        <ul className="tw-sidebar-menu">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `tw-sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <Icon className="w-5 h-5 tw-sidebar-icon" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}