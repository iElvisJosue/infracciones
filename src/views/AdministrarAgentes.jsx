// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import AdministrarAgentesFormulario from "../components/AdministrarAgentes/AdministrarAgentesFormulario";
import AdministrarAgentesListaDeAgentes from "../components/AdministrarAgentes/AdministrarAgentesListaDeAgentes";
import AdministrarAgentesEditarAgente from "../components/AdministrarAgentes/AdministrarAgentesEditarAgente";

// IMPORTAMOS LAS PROPS DEL TOAST
import { toastConfig } from "../helpers/Generales/ToastProps";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS
import "../styles/Vistas/AdministrarAgentes.css";

export default function AdministrarAgentes() {
  // ESTADOS
  const [obtenerAgentesNuevamente, establecerObtenerAgentesNuevamente] =
    useState(false);
  const [vistaAdministrarAgentes, establecerVistaAdministrarAgentes] =
    useState(0);
  const [informacionDelAgente, establecerInformacionDelAgente] = useState({});

  // VALORES COMPARTIDOS
  const PropsParaLosComponentes = {
    obtenerAgentesNuevamente,
    establecerObtenerAgentesNuevamente,
    vistaAdministrarAgentes,
    establecerVistaAdministrarAgentes,
    informacionDelAgente,
    establecerInformacionDelAgente,
  };
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Navbar TituloNavbar="Administrar Agentes" />
      <div className="Main__Contenedor">
        <section className="AdministrarAgentes">
          {vistaAdministrarAgentes === 0 ? (
            <>
              <AdministrarAgentesFormulario {...PropsParaLosComponentes} />
              <AdministrarAgentesListaDeAgentes {...PropsParaLosComponentes} />
            </>
          ) : (
            <AdministrarAgentesEditarAgente {...PropsParaLosComponentes} />
          )}
        </section>
      </div>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
