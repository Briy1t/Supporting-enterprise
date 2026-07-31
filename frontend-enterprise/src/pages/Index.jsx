import "../styles/layout.css";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const Index = () => {
    return (
        <div className="layout">
            <Sidebar />

            <main className="layout-content">

                <div className="top-panel">
                    <h2>Infraestructura Segura - Rendimiento Garantizado</h2>
                    <p>Soporte IT profesional, hardening avanzado y monitorización continua para empresas modernas.</p>
                </div>

                <Dashboard />
            </main>
        </div>
    );
};

export default Index;

