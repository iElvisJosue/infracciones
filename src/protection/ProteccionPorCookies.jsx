import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Cargando from "../components/Globales/Cargando";

export default function ProteccionPorCookies() {
  const { cargando, tieneCookie } = useGlobal();

  if (cargando) return <Cargando />;
  if (!cargando && !tieneCookie) return <Navigate to="/" replace />;

  return <Outlet />;
}
