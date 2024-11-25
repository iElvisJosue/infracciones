/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import InputBusqueda from "../Globales/InputBusqueda";
import TextoResultados from "../Globales/TextoResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerGruasActivarPorFiltro from "../../hooks/CrearInfraccion/useObtenerGruasActivarPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/CrearInfraccion/CrearInfraccionSeleccionarGrua.css";

export default function CrearInfraccionSeleccionarGrua({
  establecerInformacionDeLaGrua,
  establecerVistaCrearInfraccion,
}) {
  const { gruas, cargandoGruas, establecerFiltroGruas } =
    useObtenerGruasActivarPorFiltro();
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
    if (gruas) {
      const CantidadDePaginasEnGruas = Math.ceil(
        gruas.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(CantidadDePaginasEnGruas);
    }
  }, [gruas]);

  const EstablecerGruaYVista = (persona) => {
    establecerInformacionDeLaGrua(persona);
    establecerVistaCrearInfraccion(3);
  };

  if (cargandoGruas) {
    return <Cargando />;
  }

  return (
    <div className="CrearInfraccionSeleccionarGrua">
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaCrearInfraccion}
        VistaRegresar={1}
      />
      <h1 className="CrearInfraccionSeleccionarGrua--Titulo">
        Paso 3/6 <br />
        Selecciona la grúa <br /> 👥
      </h1>
      <InputBusqueda
        establecerFiltro={establecerFiltroGruas}
        placeholder="Nombre de la grúa"
        reiniciarValores={reiniciarValores}
      />
      {gruas.length > CantidadParaMostrar && (
        <ControlDePaginacion
          resultadosComponente={gruas}
          paginaParaMostrar={paginaParaMostrar}
          cantidadDePaginas={cantidadDePaginas}
          CantidadParaMostrar={CantidadParaMostrar}
          MostrarVeinticincoMas={MostrarVeinticincoMas}
          MostrarVeinticincoMenos={MostrarVeinticincoMenos}
          indiceInicial={indiceInicial}
          indiceFinal={indiceFinal}
        />
      )}
      {gruas.length > 0 && <TextoResultados listaContenido={gruas} />}
      {gruas.length > 0 ? (
        gruas.slice(indiceInicial, indiceFinal).map((grua) => (
          <section
            className="CrearInfraccionSeleccionarGrua__Grua"
            key={grua.idGrua}
            onClick={() => {
              EstablecerGruaYVista(grua);
            }}
          >
            <img src="imagenes/InformacionGrua.png" alt="Imagen grua" />
            <p>{grua.NombreGrua}</p>
          </section>
        ))
      ) : (
        <SinResultados>
          ¡Vaya! No se encontraron grúas registradas.
        </SinResultados>
      )}
    </div>
  );
}
