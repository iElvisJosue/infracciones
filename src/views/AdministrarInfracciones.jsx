// LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";
import AdministrarInfraccionesListaCompleta from "../components/AdministrarInfracciones/AdministrarInfraccionesListaCompleta";
import AdministrarInfraccionesPorFecha from "../components/AdministrarInfracciones/AdministrarInfraccionesPorFecha";
import AdministrarInfraccionesDetalles from "../components/AdministrarInfracciones/AdministrarInfraccionesDetalles";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS
import "../styles/Vistas/AdministrarInfracciones.css";

export default function AdministrarInfracciones() {
  // ESTADOS
  const [vistaAdministrarInfracciones, establecerVistaAdministrarInfracciones] =
    useState(0);
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [detallesInfraccion, establecerDetallesInfraccion] = useState(null);

  const EstablecerLosDetallesDeLaInfraccion = (Infraccion, esCompleta) => {
    establecerDetallesInfraccion(Infraccion);
    establecerEsCompleta(esCompleta);
    establecerVistaAdministrarInfracciones(2);
  };

  // VALORES COMPARTIDOS
  const PropsParaLosComponentes = {
    esCompleta,
    establecerVistaAdministrarInfracciones,
    detallesInfraccion,
    establecerDetallesInfraccion,
    EstablecerLosDetallesDeLaInfraccion,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: AdministrarInfraccionesListaCompleta,
    1: AdministrarInfraccionesPorFecha,
    2: AdministrarInfraccionesDetalles,
  };
  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar =
    componentesParaMostrar[vistaAdministrarInfracciones];
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Navbar TituloNavbar="Administrar Infracciones" />
      <div className="Main__Contenedor">
        <section className="AdministrarInfracciones">
          {vistaAdministrarInfracciones < 2 && (
            <span className="AdministrarInfracciones__Opciones">
              {vistaAdministrarInfracciones === 0 ? (
                <button
                  type="button"
                  className="AdministrarInfracciones__Opciones--Boton BuscarPorFecha"
                  onClick={() => establecerVistaAdministrarInfracciones(1)}
                >
                  <ion-icon name="calendar"></ion-icon> Buscar por fecha
                </button>
              ) : (
                <button
                  type="button"
                  className="AdministrarInfracciones__Opciones--Boton ListaCompleta"
                  onClick={() => establecerVistaAdministrarInfracciones(0)}
                >
                  <ion-icon name="list"></ion-icon> Lista completa
                </button>
              )}
            </span>
          )}
          <ComponenteParaRenderizar {...PropsParaLosComponentes} />
        </section>
      </div>
      <ToastContainer limit={2} transition={Zoom} draggable stacked />
    </main>
  );
}
