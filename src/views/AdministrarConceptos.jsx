// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import AdministrarConceptosFormulario from "../components/AdministrarConceptos/AdministrarConceptosFormulario";
import AdministrarConceptosListaDeConceptos from "../components/AdministrarConceptos/AdministrarConceptosListaDeConceptos";
import AdministrarConceptosEditarConcepto from "../components/AdministrarConceptos/AdministrarConceptosEditarConcepto";

// IMPORTAMOS LAS PROPS DEL TOAST
import { toastConfig } from "../helpers/Generales/ToastProps";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS
import "../styles/Vistas/AdministrarConceptos.css";

export default function AdministrarConceptos() {
  // ESTADOS
  const [obtenerConceptosNuevamente, establecerObtenerConceptosNuevamente] =
    useState(false);
  const [vistaAdministrarConceptos, establecerVistaAdministrarConceptos] =
    useState(0);
  const [informacionDelConcepto, establecerInformacionDelConcepto] = useState(
    {}
  );

  // VALORES COMPARTIDOS
  const PropsParaLosComponentes = {
    obtenerConceptosNuevamente,
    establecerObtenerConceptosNuevamente,
    vistaAdministrarConceptos,
    establecerVistaAdministrarConceptos,
    informacionDelConcepto,
    establecerInformacionDelConcepto,
  };
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Navbar TituloNavbar="Administrar Conceptos" />
      <section className="AdministrarConceptos">
        {vistaAdministrarConceptos === 0 ? (
          <>
            <AdministrarConceptosFormulario {...PropsParaLosComponentes} />
            <AdministrarConceptosListaDeConceptos
              {...PropsParaLosComponentes}
            />
          </>
        ) : (
          <AdministrarConceptosEditarConcepto {...PropsParaLosComponentes} />
        )}
      </section>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
