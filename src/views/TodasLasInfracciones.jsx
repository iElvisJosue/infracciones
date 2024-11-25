// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import TodasLasInfraccionesListaCompleta from "../components/TodasLasInfracciones/TodasLasInfraccionesListaCompleta";
import TodasLasInfraccionesListaPorFecha from "../components/TodasLasInfracciones/TodasLasInfraccionesListaPorFecha";
import TodasLasInfraccionesDetalles from "../components/TodasLasInfracciones/TodasLasInfraccionesDetalles";

// IMPORTAMOS LAS PROPS DEL TOAST
import { toastConfig } from "../helpers/Generales/ToastProps";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS
import "../styles/Vistas/TodasLasInfracciones.css";

export default function TodasLasInfracciones() {
  // ESTADOS
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [vistaTodasLasInfracciones, establecerVistaTodasLasInfracciones] =
    useState(0);
  const [detallesInfraccion, establecerDetallesInfraccion] = useState(null);

  const EstablecerLosDetallesDeLaInfraccion = (Infraccion, esCompleta) => {
    establecerDetallesInfraccion(Infraccion);
    establecerEsCompleta(esCompleta);
    establecerVistaTodasLasInfracciones(2);
  };

  // VALORES COMPARTIDOS
  const PropsParaLosComponentes = {
    esCompleta,
    establecerVistaTodasLasInfracciones,
    detallesInfraccion,
    establecerDetallesInfraccion,
    EstablecerLosDetallesDeLaInfraccion,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: TodasLasInfraccionesListaCompleta,
    1: TodasLasInfraccionesListaPorFecha,
    2: TodasLasInfraccionesDetalles,
  };
  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar =
    componentesParaMostrar[vistaTodasLasInfracciones];
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Navbar TituloNavbar="Todas las infracciones" />
      <section className="TodasLasInfracciones">
        {vistaTodasLasInfracciones < 2 && (
          <span className="TodasLasInfracciones__Opciones">
            {vistaTodasLasInfracciones === 0 ? (
              <button
                type="button"
                className="TodasLasInfracciones__Opciones--Boton BuscarPorFecha"
                onClick={() => establecerVistaTodasLasInfracciones(1)}
              >
                <ion-icon name="calendar"></ion-icon> Lista por fechas
              </button>
            ) : (
              <button
                type="button"
                className="TodasLasInfracciones__Opciones--Boton ListaCompleta"
                onClick={() => establecerVistaTodasLasInfracciones(0)}
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
