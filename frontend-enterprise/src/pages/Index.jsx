import "../styles/layout.css";
import Sidebar from "../components/Sidebar";

const Index = () => {
    return (
        <div className="layout">
            <Sidebar />

            <main className="layout-content">

                <div className="top-panel">
                    <h1>SUPPORTING 🫴</h1>
                    <h2>Infraestructura Segura - Rendimiento Garantizado</h2>
                    <p>Soporte IT profesional, hardening avanzado y monitorización continua para empresas modernas.</p>
                </div>

                {/* Aquí irá el panel general (dashboard) */}

            </main>
        </div>
    );
};

export default Index;
