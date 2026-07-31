import { useEffect, useState } from "react";

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/dashboard")
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    if (!data) return <p>Cargando datos...</p>;

    return (
        <div className="dashboard">
            <div className="card">
                <h3>Clientes activos</h3>
                <p>{data.clientes_activos}</p>
            </div>

            <div className="card">
                <h3>Técnicos disponibles</h3>
                <p>{data.tecnicos_disponibles}</p>
            </div>

            <div className="card">
                <h3>Servicios contratados</h3>
                <p>{data.servicios_contratados}</p>
            </div>

            <div className="card">
                <h3>Alertas activas</h3>
                <p>{data.alertas_activas}</p>
            </div>

            <div className="card">
                <h3>Tickets abiertos</h3>
                <p>{data.tickets_abiertos}</p>
            </div>
        </div>
    );
};

export default Dashboard;
