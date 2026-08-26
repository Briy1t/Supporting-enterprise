import { useEffect, useState } from "react";
import { Users, Wrench, ShieldCheck, AlertTriangle, Ticket } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const cardsConfig = [
    {
      title: "Clientes activos",
      value: data?.clientes_activos ?? 0,
      icon: Users,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Técnicos disponibles",
      value: data?.tecnicos_disponibles ?? 0,
      icon: Wrench,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Servicios contratados",
      value: data?.servicios_contratados ?? 0,
      icon: ShieldCheck,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Alertas activas",
      value: data?.alertas_activas ?? 0,
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "Tickets abiertos",
      value: data?.tickets_abiertos ?? 0,
      icon: Ticket,
      color: "text-rose-600 bg-rose-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner / Header del Dashboard */}
      <div className="tw-top-panel">
        <h1 className="tw-top-title">Infraestructura Segura – Rendimiento Garantizado</h1>
        <p className="tw-top-desc">
          Soporte IT profesional, hardening avanzado y monitorización continua para empresas modernas.
        </p>
      </div>

      {/* Grid de Tarjetas de Métricas */}
      <div className="tw-dashboard">
        {cardsConfig.map(({ title, value, icon: Icon, color }, index) => (
          <div key={index} className="tw-card">
            <div className="tw-card-header">
              <span className="tw-card-title">{title}</span>
              <div className={`p-2.5 rounded-lg ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            
            {loading ? (
              <div className="h-9 w-20 bg-slate-200 animate-pulse rounded-md mt-2"></div>
            ) : (
              <p className="tw-card-number">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}