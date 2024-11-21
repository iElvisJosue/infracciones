import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Cargando from "../components/Globales/Cargando";

export default function ProteccionParaAdministradores() {
  const { cargando, agente } = useGlobal();

  if (cargando) return <Cargando />;
  if (agente.TipoPerfilAgente !== "Administrador")
    return <Navigate to="/Menu" replace />;

  return <Outlet />;
}
