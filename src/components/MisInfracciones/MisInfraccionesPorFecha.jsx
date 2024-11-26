/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../components/Globales/Cargando";
import SinResultados from "../../components/Globales/SinResultados";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/Generales/Funciones";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarInfraccionesPorAgenteYFecha from "../../hooks/MisInfracciones/useBuscarInfraccionesPorAgenteYFecha";

// ESTILOS A USAR
import "../../styles/Componentes/MisInfracciones/MisInfraccionesPorFecha.css";

export default function MisInfraccionesPorFecha({
  idAgente,
  EstablecerLosDetallesDeLaInfraccion,
}) {
  const {
    infraccionesPorFecha,
    cargandoInfraccionesPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarInfraccionesPorAgenteYFecha({ idAgente });

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoInfraccionesPorFecha) return <Cargando />;

  return (
    <div className="MisInfraccionesPorFecha">
      <h1 className="MisInfraccionesPorFecha__Titulo">
        Lista por fechas
        <small className="MisInfraccionesPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
        📅
      </h1>
      <div className="MisInfraccionesPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="MisInfraccionesPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="MisInfraccionesPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {infraccionesPorFecha.length > 0 ? (
        <>
          <small className="MisInfraccionesPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {infraccionesPorFecha.length} resultados{" "}
          </small>
          <div className="MisInfraccionesPorFecha__Cuerpo">
            <table className="MisInfraccionesPorFecha__Cuerpo__Tabla">
              <thead className="MisInfraccionesPorFecha__Cuerpo__Tabla__Encabezado">
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
              <tbody className="MisInfraccionesPorFecha__Cuerpo__Tabla__Cuerpo">
                {infraccionesPorFecha.map((infInfraccion) => (
                  <tr key={infInfraccion.idInfraccion}>
                    <td>{infInfraccion.idInfraccion}</td>
                    <td>
                      {infInfraccion.NombrePersona}{" "}
                      {infInfraccion.ApelledoPaternoPersona}{" "}
                      {infInfraccion.ApellidoMaternoPersona}
                    </td>
                    <td>{infInfraccion.NombreGrua}</td>
                    <td>
                      {FormatearFecha(
                        infInfraccion.FechaCreacionInfraccion.slice(0, 10)
                      )}{" "}
                      {infInfraccion.HoraCreacionInfraccion}
                    </td>
                    <td>
                      <button
                        className="MisInfraccionesPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
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
