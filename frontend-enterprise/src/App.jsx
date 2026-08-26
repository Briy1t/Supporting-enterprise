import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clientes from "./pages/Clientes";
import Tecnicos from "./pages/Tecnicos";
import Servicios from "./pages/Servicios/Servicios";
import Alertas from "./pages/Alertas";
import Administracion from "./pages/Administracion/Administracion";
import CrearCliente from "./pages/CrearCliente";
import Contratos from "./pages/Contratos";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/tecnicos" element={<Tecnicos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/administracion" element={<Administracion />} />
        <Route path="/crear-cliente" element={<CrearCliente />} />
        <Route path= "/contratos" element={<Contratos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
