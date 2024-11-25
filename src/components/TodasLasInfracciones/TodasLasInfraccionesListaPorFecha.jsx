/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import TextoResultados from "../Globales/TextoResultados";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/Generales/Funciones";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarInfraccionesPorFecha from "../../hooks/TodasLasInfracciones/useBuscarInfraccionesPorFecha";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/TodasLasInfracciones/TodasLasInfraccionesListaPorFecha.css";

export default function TodasLasInfraccionesListaPorFecha({
  EstablecerLosDetallesDeLaInfraccion,
}) {
  const {
    infraccionesPorFecha,
    cargandoInfraccionesPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarInfraccionesPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoInfraccionesPorFecha) return <Cargando />;

  return (
    <div className="TodasLasInfraccionesListaPorFecha">
      <h1 className="TodasLasInfraccionesListaPorFecha__Titulo">
        Lista Por Fechas
        <small className="TodasLasInfraccionesListaPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
        📅
      </h1>
      <div className="TodasLasInfraccionesListaPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="TodasLasInfraccionesListaPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="TodasLasInfraccionesListaPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {infraccionesPorFecha.length > 0 ? (
        <>
          <TextoResultados listaContenido={infraccionesPorFecha} />
          <div className="TodasLasInfraccionesListaPorFecha__Cuerpo">
            <table className="TodasLasInfraccionesListaPorFecha__Cuerpo__Tabla">
              <thead className="TodasLasInfraccionesListaPorFecha__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    ID Infracción
                  </th>
                  <th>
                    <ion-icon name="person"></ion-icon>
                    <br />
                    Persona
                  </th>
                  <th>
                    <ion-icon name="construct"></ion-icon>
                    <br />
                    Grúa
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    Agente
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    Fecha y Hora
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="TodasLasInfraccionesListaPorFecha__Cuerpo__Tabla__Cuerpo">
                {infraccionesPorFecha.map((infInfraccion) => (
                  <tr key={infInfraccion.idInfraccion}>
                    <td>{infInfraccion.idInfraccion}</td>
                    <td>
                      {infInfraccion.NombrePersona}{" "}
                      {infInfraccion.ApelledoPaternoPersona}{" "}
                      {infInfraccion.ApellidoMaternoPersona}
                    </td>
                    <td>{infInfraccion.NombreGrua}</td>
                    <td>{infInfraccion.ClaveInternaAgente}</td>
                    <td>
                      {FormatearFecha(
                        infInfraccion.FechaCreacionInfraccion.slice(0, 10)
                      )}{" "}
                      {infInfraccion.HoraCreacionInfraccion}
                    </td>
                    <td>
                      <button
                        className="TodasLasInfraccionesListaPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaInfraccion(
                            infInfraccion,
                            false
                          )
                        }
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <SinResultados>
          {`¡Oops! No se encontraron resultados para las fechas ${FormatearFecha(
            primeraFecha
          )} y ${FormatearFecha(segundaFecha)}.`}
        </SinResultados>
      )}
    </div>
  );
}
