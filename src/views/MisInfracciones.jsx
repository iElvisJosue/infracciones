// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS CONTEXTOS
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS PROPS DEL TOAST
import { toastConfig } from "../helpers/Generales/ToastProps";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import MisInfraccionesListaCompleta from "../components/MisInfracciones/MisInfraccionesListaCompleta";
import MisInfraccionesPorFecha from "../components/MisInfracciones/MisInfraccionesPorFecha";
import MisInfraccionesDetalles from "../components/MisInfracciones/MisInfraccionesDetalles";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS
import "../styles/Vistas/MisInfracciones.css";

export default function MisInfracciones() {
  const { agente } = useGlobal();
  // ESTADOS
  const [vistaMisInfracciones, establecerVistaMisInfracciones] = useState(0);
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [detallesInfraccion, establecerDetallesInfraccion] = useState(null);

  const EstablecerLosDetallesDeLaInfraccion = (Infraccion, esCompleta) => {
    establecerDetallesInfraccion(Infraccion);
    establecerEsCompleta(esCompleta);
    establecerVistaMisInfracciones(2);
  };

  // VALORES COMPARTIDOS
  const PropsParaLosComponentes = {
    idAgente: agente.idAgente,
    esCompleta,
    establecerVistaMisInfracciones,
    detallesInfraccion,
    establecerDetallesInfraccion,
    EstablecerLosDetallesDeLaInfraccion,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: MisInfraccionesListaCompleta,
    1: MisInfraccionesPorFecha,
    2: MisInfraccionesDetalles,
  };
  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaMisInfracciones];
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Navbar TituloNavbar="Mis Infracciones" />
      <section className="MisInfracciones">
        {vistaMisInfracciones < 2 && (
          <span className="MisInfracciones__Opciones">
            {vistaMisInfracciones === 0 ? (
              <button
                type="button"
                className="MisInfracciones__Opciones--Boton BuscarPorFecha"
                onClick={() => establecerVistaMisInfracciones(1)}
              >
                <ion-icon name="calendar"></ion-icon> Lista por fechas
              </button>
            ) : (
              <button
                type="button"
                className="MisInfracciones__Opciones--Boton ListaCompleta"
                onClick={() => establecerVistaMisInfracciones(0)}
              >
                <ion-icon name="list"></ion-icon> Lista completa
              </button>
            )}
          </span>
        )}
        <ComponenteParaRenderizar {...PropsParaLosComponentes} />
      </section>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
