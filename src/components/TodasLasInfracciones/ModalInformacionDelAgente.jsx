/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Globales/Cargando";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarInfraccionesDeUnAgente from "../../hooks/TodasLasInfracciones/useBuscarInfraccionesDeUnAgente";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/Generales/Funciones";
import { HOST_IMG_AGENTES } from "../../helpers/Generales/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/TodasLasInfracciones/ModalInformacionDelAgente.css";

export default function ModalInformacionDelAgente({
  idAgente,
  establecerMostrarModalAgente,
}) {
  const { infraccionesDelAgente, cargandoInfraccionesDelAgente } =
    useBuscarInfraccionesDeUnAgente(idAgente);

  return (
    <div className="ModalInformacionDelAgente">
      <section className="ModalInformacionDelAgente__Contenido">
        {cargandoInfraccionesDelAgente ? (
          <Cargando />
        ) : (
          <>
            <button
              className="ModalInformacionDelAgente__Contenido--Cerrar"
              onClick={() => establecerMostrarModalAgente(false)}
            >
              <ion-icon name="close"></ion-icon>
            </button>
            <h1 className="ModalInformacionDelAgente__Contenido--Titulo">
              Inf. Agente
            </h1>
            <img
              src={`${HOST_IMG_AGENTES}${
                infraccionesDelAgente[0]?.FotoAgente || "Default.png"
              } `}
              alt="Imagen Del Agente"
              className="ModalInformacionDelAgente__Contenido--Imagen"
            />
            <span className="ModalInformacionDelAgente__Contenido--Texto">
              🔑
              <br />
              <b>Clave interna</b>
              <br />
              <small>
                {infraccionesDelAgente[0]?.ClaveInternaAgente || "N/A"}
              </small>
            </span>
            <span className="ModalInformacionDelAgente__Contenido--Texto">
              🕵️‍♂️
              <br />
              <b>Nombre Completo</b>
              <br />
              <small>
                {infraccionesDelAgente[0]?.NombreAgente || "N/A"}{" "}
                {infraccionesDelAgente[0]?.ApellidosAgente || ""}
              </small>
            </span>
            <span className="ModalInformacionDelAgente__Contenido--Texto">
              🚦
              <br />
              <b>Infracciones realizadas</b>
              <br />
              <small>{infraccionesDelAgente.length}</small>
            </span>
            <span className="ModalInformacionDelAgente__Contenido--Texto">
              📅
              <br />
              <b>Última infracción</b>
              <br />
              <small>
                Infracción #{infraccionesDelAgente[0]?.idInfraccion || "0"}
              </small>
              <br />
              <small>
                {infraccionesDelAgente[0]?.FechaCreacionInfraccion
                  ? FormatearFecha(
                      infraccionesDelAgente[0]?.FechaCreacionInfraccion.slice(
                        0,
                        10
                      )
                    )
                  : "00-00-0000"}
              </small>
              <br />
              <small>
                {infraccionesDelAgente[0]?.HoraCreacionInfraccion || "00:00:00"}
              </small>
            </span>
          </>
        )}
      </section>
    </div>
  );
}
