// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import AdministrarDocumentosFormulario from "../components/AdministrarDocumentos/AdministrarDocumentosFormulario";
import AdministrarDocumentosListaDeDocumentos from "../components/AdministrarDocumentos/AdministrarDocumentosListaDeDocumentos";
import AdministrarDocumentosEditarDocumento from "../components/AdministrarDocumentos/AdministrarDocumentosEditarDocumento";

// IMPORTAMOS LAS PROPS DEL TOAST
import { toastConfig } from "../helpers/Generales/ToastProps";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS
import "../styles/Vistas/AdministrarDocumentos.css";

export default function AdministrarDocumentos() {
  // ESTADOS
  const [obtenerDocumentosNuevamente, establecerObtenerDocumentosNuevamente] =
    useState(false);
  const [vistaAdministrarDocumentos, establecerVistaAdministrarDocumentos] =
    useState(0);
  const [informacionDelDocumento, establecerInformacionDelDocumento] = useState(
    {}
  );

  // VALORES COMPARTIDOS
  const PropsParaLosComponentes = {
    obtenerDocumentosNuevamente,
    establecerObtenerDocumentosNuevamente,
    vistaAdministrarDocumentos,
    establecerVistaAdministrarDocumentos,
    informacionDelDocumento,
    establecerInformacionDelDocumento,
  };
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Navbar TituloNavbar="Administrar Documentos" />
      <section className="AdministrarDocumentos">
        {vistaAdministrarDocumentos === 0 ? (
          <>
            <AdministrarDocumentosFormulario {...PropsParaLosComponentes} />
            <AdministrarDocumentosListaDeDocumentos
              {...PropsParaLosComponentes}
            />
          </>
        ) : (
          <AdministrarDocumentosEditarDocumento {...PropsParaLosComponentes} />
        )}
      </section>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
