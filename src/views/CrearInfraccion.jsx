// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import CrearInfraccionSeleccionarPersona from "../components/CrearInfraccion/CrearInfraccionSeleccionarPersona";
import CrearInfraccionDetallesInfraccion from "../components/CrearInfraccion/CrearInfraccionDetallesInfraccion";
import CrearInfraccionSeleccionarGrua from "../components/CrearInfraccion/CrearInfraccionSeleccionarGrua";
import CrearInfraccionConceptos from "../components/CrearInfraccion/CrearInfraccionConceptos";
import CrearInfraccionDocumentosRetenidos from "../components/CrearInfraccion/CrearInfraccionDocumentosRetenidos";
import CrearInfraccionEvidencias from "../components/CrearInfraccion/CrearInfraccionEvidencias";
import CrearInfraccionInformacionDetallada from "../components/CrearInfraccion/CrearInfraccionInformacionDetallada";

// IMPORTAMOS LAS PROPS DEL TOAST
import { toastConfig } from "../helpers/Generales/ToastProps";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS
import "../styles/Vistas/CrearInfraccion.css";

export default function CrearInfraccion() {
  const [vistaCrearInfraccion, establecerVistaCrearInfraccion] = useState(0);
  const [informacionDeLaPersona, establecerInformacionDeLaPersona] = useState(
    {}
  );
  const [informacionDeLaInfraccion, establecerInformacionDeLaInfraccion] =
    useState({});
  const [informacionDeLaGrua, establecerInformacionDeLaGrua] = useState({});
  const [informacionDelConcepto, establecerInformacionDelConcepto] = useState(
    []
  );
  const [
    informacionDocumentosRetenidos,
    establecerInformacionDocumentosRetenidos,
  ] = useState([]);
  const [informacionDeLasEvidencias, establecerInformacionDeLasEvidencias] =
    useState([]);
  const [idDeLaInfraccion, establecerIdDeLaInfraccion] = useState(null);

  // FUNCIÓN PARA REINICIAR TODOS LOS VALORES
  const ReiniciarValoresParaNuevaInfraccion = (vista) => {
    establecerInformacionDeLaPersona({});
    establecerInformacionDeLaInfraccion({});
    establecerInformacionDeLaGrua({});
    establecerInformacionDelConcepto([]);
    establecerInformacionDocumentosRetenidos([]);
    establecerInformacionDeLasEvidencias([]);
    establecerIdDeLaInfraccion(null);
    establecerVistaCrearInfraccion(vista);
  };

  // VALORES COMPARTIDOS
  const PropsParaLosComponentes = {
    informacionDeLaPersona,
    establecerInformacionDeLaPersona,
    vistaCrearInfraccion,
    establecerVistaCrearInfraccion,
    informacionDeLaInfraccion,
    establecerInformacionDeLaInfraccion,
    informacionDeLaGrua,
    establecerInformacionDeLaGrua,
    informacionDelConcepto,
    establecerInformacionDelConcepto,
    informacionDocumentosRetenidos,
    establecerInformacionDocumentosRetenidos,
    informacionDeLasEvidencias,
    establecerInformacionDeLasEvidencias,
    idDeLaInfraccion,
    establecerIdDeLaInfraccion,
    ReiniciarValoresParaNuevaInfraccion,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: CrearInfraccionSeleccionarPersona,
    1: CrearInfraccionDetallesInfraccion,
    2: CrearInfraccionSeleccionarGrua,
    3: CrearInfraccionConceptos,
    4: CrearInfraccionDocumentosRetenidos,
    5: CrearInfraccionEvidencias,
    6: CrearInfraccionInformacionDetallada,
  };
  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaCrearInfraccion];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Navbar TituloNavbar="Crear Infracción" />
      <div className="Main__Contenedor">
        <section className="CrearInfraccion">
          <ComponenteParaRenderizar {...PropsParaLosComponentes} />
        </section>
      </div>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
