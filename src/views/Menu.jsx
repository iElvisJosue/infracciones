// IMPORTAMOS LAS LIBRERÍAS A USAR
import { ToastContainer } from "react-toastify";
import { Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Globales/Navbar";

// IMPORTAMOS LAS AYUDAS A USAR
import { OPCIONES_DEL_MENU } from "../helpers/Menu/MenuOpciones";

// HOOKS A USAR
import useCerrarSesion from "../hooks/Menu/useCerrarSesion";

// IMPORTAMOS LOS ESTILOS GENERALES
import "../styles/Generales/Generales.css";
// IMPORTAMOS LOS ESTILOS DEL MENU
import "../styles/Vistas/Menu.css";

export default function Menu() {
  const { agente } = useGlobal();
  const { CerrandoSesion } = useCerrarSesion();

  const { TipoPerfilAgente } = agente;

  return (
    // LOS ESTILOS DEL MAIN ESTÁN GENERALES > GENERALES.CSS
    <main className="Main">
      <Navbar />
      <div className="Main__Contenedor">
        <h1 className="Main__Contenedor--Titulo">
          Menú Principal, ¿Qué deseas hacer? <br />
          🤔
        </h1>
        <div className="Menu">
          {OPCIONES_DEL_MENU[TipoPerfilAgente].map(
            (
              {
                ImagenDeLaOpcion,
                AltImagenDeLaOpcion,
                NombreDeLaOpcion,
                VinculoOpcion,
              },
              index
            ) => (
              <section
                className="Menu--Opcion"
                key={index}
                onClick={() => (window.location.href = VinculoOpcion)}
              >
                <img
                  src={ImagenDeLaOpcion}
                  alt={AltImagenDeLaOpcion}
                  className="Menu--Opcion--Imagen"
                />
                <p className="Menu--Opcion--Titulo">{NombreDeLaOpcion}</p>
              </section>
            )
          )}
          <section
            className="Menu--Opcion CerrarSesion"
            onClick={CerrandoSesion}
          >
            <img
              src="imagenes/CerrarSesion.png"
              alt="Icono De Cierre De Sesión"
              className="Menu--Opcion--Imagen CerrarSesion"
            />
            <p className="Menu--Opcion--Titulo CerrarSesion">Cerrar Sesión</p>
          </section>
        </div>
      </div>
      <ToastContainer limit={2} transition={Zoom} draggable stacked />
    </main>
  );
}