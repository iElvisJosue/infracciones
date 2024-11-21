/* eslint-disable react/prop-types */

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/Generales/Funciones";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../components/Globales/Cargando";
import SinResultados from "../../components/Globales/SinResultados";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarInfraccionesPorAgenteYFiltro from "../../hooks/MisInfracciones/useBuscarInfraccionesPorAgenteYFiltro";

export default function MisInfraccionesListaCompleta({
  idAgente,
  EstablecerLosDetallesDeLaInfraccion,
}) {
  const {
    infracciones,
    cargandoInfracciones,
    filtroInfracciones,
    establecerFiltroInfracciones,
  } = useBuscarInfraccionesPorAgenteYFiltro({ idAgente });

  const BuscarInfraccion = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroInfracciones(valorIntroducido);
    }
  };

  if (cargandoInfracciones) return <Cargando />;

  return (
    <div className="MisInfraccionesListaCompleta">
      <h1 className="MisInfraccionesListaCompleta__Titulo">
        Lista completa de infracciones <br />
        🛑
      </h1>
      <span className="MisInfraccionesListaCompleta__Buscar">
        <input
          value={filtroInfracciones}
          type="text"
          placeholder="Buscar infracción"
          onChange={BuscarInfraccion}
        />
        <span className="MisInfraccionesListaCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {infracciones.length > 0 ? (
        <>
          <small className="MisInfraccionesListaCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {infracciones.length} resultados{" "}
          </small>
          <div className="MisInfraccionesListaCompleta__Cuerpo">
            <table className="MisInfraccionesListaCompleta__Cuerpo__Tabla">
              <thead className="MisInfraccionesListaCompleta__Cuerpo__Tabla__Encabezado">
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
              <tbody className="MisInfraccionesListaCompleta__Cuerpo__Tabla__Cuerpo">
                {infracciones.map((infInfraccion) => (
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
                        className="MisInfraccionesListaCompleta__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaInfraccion(
                            infInfraccion,
                            true
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
        <SinResultados>¡Oops! No se encontraron resultados.</SinResultados>
      )}
    </div>
  );
}
