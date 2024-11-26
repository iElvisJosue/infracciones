// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import PerfilInformacion from "../components/Perfil/PerfilInformacion";
import PerfilActualizarImagen from "../components/Perfil/PerfilActualizarImagen";
import PerfilActualizarInformacion from "../components/Perfil/PerfilActualizarInformacion";
import PerfilActualizarContraseña from "../components/Perfil/PerfilActualizarContraseña";

// HOOKS A USAR
import useCerrarSesion from "../hooks/Menu/useCerrarSesion";

// IMPORTAMOS LAS PROPS DEL TOAST
import { toastConfig } from "../helpers/Generales/ToastProps";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS DEL MENU
import "../styles/Vistas/Perfil.css";

export default function Perfil() {
  const [vistaPerfil, establecerVistaPerfil] = useState(0);
  const { agente, ObtenerInformacionAgente } = useGlobal();
  const { CerrandoSesion } = useCerrarSesion();

  // VALORES COMPARTIDOS ENTRE VISTAS
  const ValoresCompartidos = {
    agente,
    ObtenerInformacionAgente,
    CerrandoSesion,
    establecerVistaPerfil,
  };

  //   COMPONENTES PARA RENDERIZAR
  const ListaDeComponentes = {
    0: PerfilInformacion,
    1: PerfilActualizarImagen,
    2: PerfilActualizarInformacion,
    3: PerfilActualizarContraseña,
  };

  const ComponenteParaRenderizar = ListaDeComponentes[vistaPerfil];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN GENERALES > GENERALES.CSS
    <main className="Main">
      <Navbar TituloNavbar="Perfil" />
      <div className="Perfil">
        <ComponenteParaRenderizar {...ValoresCompartidos} />
      </div>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
