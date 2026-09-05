import { Route, Routes } from "react-router-dom";
import TecnicoLayout from "../layout/TecnicoLayout";

import TecnicoDashboard from "../pages/TecnicoDashboard";
import TecnicoTickets from "../pages/TecnicoTickets";
import TecnicoAlertas from "../pages/TecnicoAlertas";
import TecnicoCalendario from "../pages/TecnicoCalendario";
import TecnicoClientes from "../pages/TecnicoClientes";
import TecnicoPerfil from "../pages/TecnicoPerfil";

export default function TecnicoRouter() {
  return (
    <Routes>
      <Route element={<TecnicoLayout />}>
        <Route path="dashboard" element={<TecnicoDashboard />} />
        <Route path="tickets" element={<TecnicoTickets />} />
        <Route path="alertas" element={<TecnicoAlertas />} />
        <Route path="calendario" element={<TecnicoCalendario />} />
        <Route path="clientes" element={<TecnicoClientes />} />
        <Route path="perfil" element={<TecnicoPerfil />} />
      </Route>
    </Routes>
  );
}
