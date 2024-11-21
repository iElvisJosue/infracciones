// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import AdministrarPersonasFormulario from "../components/AdministrarPersonas/AdministrarPersonasFormulario";
import AdministrarPersonasListaDePersonas from "../components/AdministrarPersonas/AdministrarPersonasListaDePersonas";
import AdministrarPersonasEditarPersona from "../components/AdministrarPersonas/AdministrarPersonasEditarPersona";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS
import "../styles/Vistas/AdministrarPersonas.css";

export default function AdministrarPersonas() {
  // ESTADOS
  const [obtenerPersonasNuevamente, establecerObtenerPersonasNuevamente] =
    useState(false);
  const [vistaAdministrarPersonas, establecerVistaAdministrarPersonas] =
    useState(0);
  const [informacionDeLaPersona, establecerInformacionDeLaPersona] = useState(
    {}
  );

  // VALORES COMPARTIDOS
  const PropsParaLosComponentes = {
    obtenerPersonasNuevamente,
    establecerObtenerPersonasNuevamente,
    vistaAdministrarPersonas,
    establecerVistaAdministrarPersonas,
    informacionDeLaPersona,
    establecerInformacionDeLaPersona,
  };
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Navbar TituloNavbar="Administrar Personas" />
      <div className="Main__Contenedor">
        <section className="AdministrarPersonas">
          {vistaAdministrarPersonas === 0 ? (
            <>
              <AdministrarPersonasFormulario {...PropsParaLosComponentes} />
              <AdministrarPersonasListaDePersonas
                {...PropsParaLosComponentes}
              />
            </>
          ) : (
            <AdministrarPersonasEditarPersona {...PropsParaLosComponentes} />
          )}
        </section>
      </div>
      <ToastContainer limit={2} transition={Zoom} draggable stacked />
    </main>
  );
}
