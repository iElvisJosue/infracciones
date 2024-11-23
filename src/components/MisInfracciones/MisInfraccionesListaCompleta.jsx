/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/Generales/Funciones";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../components/Globales/Cargando";
import SinResultados from "../../components/Globales/SinResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarInfraccionesPorAgenteYFiltro from "../../hooks/MisInfracciones/useBuscarInfraccionesPorAgenteYFiltro";
import usePaginacion from "../../hooks/Paginacion/usePagicacion";

// ESTILOS A USAR
import "../../styles/Componentes/MisInfracciones/MisInfraccionesListaCompleta.css";

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
  const {
    CantidadParaMostrar,
    paginaParaMostrar,
    indiceInicial,
    indiceFinal,
    cantidadDePaginas,
    establecerCantidadDePaginas,
    MostrarVeinticincoMas,
    MostrarVeinticincoMenos,
    reiniciarValores,
  } = usePaginacion();
  useEffect(() => {
    if (infracciones) {
      const CantidadDePaginasEnInfracciones = Math.ceil(
        infracciones.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(CantidadDePaginasEnInfracciones);
    }
  }, [infracciones]);

  const BuscarInfraccion = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroInfracciones(valorIntroducido);
      reiniciarValores();
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
          {infracciones.length > CantidadParaMostrar && (
            <ControlDePaginacion
              resultadosComponente={infracciones}
              paginaParaMostrar={paginaParaMostrar}
              cantidadDePaginas={cantidadDePaginas}
              CantidadParaMostrar={CantidadParaMostrar}
              MostrarVeinticincoMas={MostrarVeinticincoMas}
              MostrarVeinticincoMenos={MostrarVeinticincoMenos}
              indiceInicial={indiceInicial}
              indiceFinal={indiceFinal}
            />
          )}
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
                {infracciones
                  .slice(indiceInicial, indiceFinal)
                  .map((infInfraccion) => (
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
