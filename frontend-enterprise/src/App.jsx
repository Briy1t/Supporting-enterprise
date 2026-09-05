import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clientes from "./pages/Clientes";
import Servicios from "./pages/Servicios/Servicios";
import Alertas from "./pages/Alertas";
import Administracion from "./pages/Administracion/Administracion";
import CrearCliente from "./pages/CrearCliente";
import Contratos from "./pages/Contratos/Contratos";

import TecnicosList from "./pages/Tecnicos/pages/TecnicosList";
import CrearTecnico from "./pages/Tecnicos/pages/CrearTecnico";
import TecnicoDetalle from "./pages/Tecnicos/pages/TecnicoDetalle";
import TecnicoCalendario from "./pages/Tecnicos/pages/TecnicoCalendario";
import TecnicoTickets from "./pages/Tecnicos/pages/TecnicoTickets";
import TecnicoAlertas from "./pages/Tecnicos/pages/TecnicoAlertas";
import ClientesAsignados from "./pages/Tecnicos/pages/ClientesAsignados";

import TecnicoRouter from "./modules/tecnico-panel/router/tecnicoRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Panel administrativo */}
        <Route path="/" element={<Index />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/tecnicos" element={<TecnicosList />} />
        <Route path="/tecnicos/crear" element={<CrearTecnico />} />
        <Route path="/tecnicos/:id" element={<TecnicoDetalle />} />
        <Route path="/tecnicos/:id/calendario" element={<TecnicoCalendario />} />
        <Route path="/tecnicos/:id/tickets" element={<TecnicoTickets />} />
        <Route path="/tecnicos/:id/alertas" element={<TecnicoAlertas />} />
        <Route path="/tecnicos/:id/clientes" element={<ClientesAsignados />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/administracion" element={<Administracion />} />
        <Route path="/crear-cliente" element={<CrearCliente />} />
        <Route path="/contratos" element={<Contratos />} />
        <Route path="/tecnico/*" element={<TecnicoRouter />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
