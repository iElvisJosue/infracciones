// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import AdministrarGruasFormulario from "../components/AdministrarGruas/AdministrarGruasFormulario";
import AdministrarGruasListaDeGruas from "../components/AdministrarGruas/AdministrarGruasListaDeGruas";
import AdministrarGruasEditarGrua from "../components/AdministrarGruas/AdministrarGruasEditarGrua";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS
import "../styles/Vistas/AdministrarGruas.css";

export default function AdministrarGruas() {
  // ESTADOS
  const [obtenerGruasNuevamente, establecerObtenerGruasNuevamente] =
    useState(false);
  const [vistaAdministrarGruas, establecerVistaAdministrarGruas] = useState(0);
  const [informacionDeLaGrua, establecerInformacionDeLaGrua] = useState({});

  // VALORES COMPARTIDOS
  const PropsParaLosComponentes = {
    obtenerGruasNuevamente,
    establecerObtenerGruasNuevamente,
    vistaAdministrarGruas,
    establecerVistaAdministrarGruas,
    informacionDeLaGrua,
    establecerInformacionDeLaGrua,
  };
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Navbar TituloNavbar="Administrar Grúas" />
      <div className="Main__Contenedor">
        <section className="AdministrarGruas">
          {vistaAdministrarGruas === 0 ? (
            <>
              <AdministrarGruasFormulario {...PropsParaLosComponentes} />
              <AdministrarGruasListaDeGruas {...PropsParaLosComponentes} />
            </>
          ) : (
            <AdministrarGruasEditarGrua {...PropsParaLosComponentes} />
          )}
        </section>
      </div>
      <ToastContainer limit={2} transition={Zoom} draggable stacked />
    </main>
  );
}