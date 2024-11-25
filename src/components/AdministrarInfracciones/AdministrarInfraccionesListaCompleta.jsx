/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/Generales/Funciones";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import InputBusqueda from "../Globales/InputBusqueda";
import TextoResultados from "../Globales/TextoResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarInfraccionesPorFiltro from "../../hooks/AdministrarInfracciones/useBuscarInfraccionesPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/AdministrarInfracciones/AdministrarInfraccionesListaCompleta.css";

export default function AdministrarInfraccionesListaCompleta({
  EstablecerLosDetallesDeLaInfraccion,
}) {
  const { infracciones, cargandoInfracciones, establecerFiltroInfracciones } =
    useBuscarInfraccionesPorFiltro();
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

  if (cargandoInfracciones) return <Cargando />;

  return (
    <div className="AdministrarInfraccionesListaCompleta">
      <h1 className="AdministrarInfraccionesListaCompleta__Titulo">
        Lista completa de infracciones <br />
        🛑
      </h1>
      <InputBusqueda
        establecerFiltro={establecerFiltroInfracciones}
        placeholder="Buscar infracción"
        reiniciarValores={reiniciarValores}
      />
      {infracciones.length > 0 ? (
        <>
          <TextoResultados listaContenido={infracciones} />
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
          <div className="AdministrarInfraccionesListaCompleta__Cuerpo">
            <table className="AdministrarInfraccionesListaCompleta__Cuerpo__Tabla">
              <thead className="AdministrarInfraccionesListaCompleta__Cuerpo__Tabla__Encabezado">
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
              <tbody className="AdministrarInfraccionesListaCompleta__Cuerpo__Tabla__Cuerpo">
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
                          className="AdministrarInfraccionesListaCompleta__Cuerpo__Tabla__Cuerpo__VerDetalles"
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
