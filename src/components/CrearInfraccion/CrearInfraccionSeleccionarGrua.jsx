/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerGruasActivarPorFiltro from "../../hooks/CrearInfraccion/useObtenerGruasActivarPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePagicacion";

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

  const BuscarGruas = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroGruas(valorIntroducido);
      reiniciarValores();
    }
  };

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
      <span className="CrearInfraccionSeleccionarGrua__Buscar">
        <input type="text" placeholder="Buscar grúa" onChange={BuscarGruas} />
        <span className="CrearInfraccionSeleccionarGrua__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      <small className="CrearInfraccionSeleccionarGrua__TextoResultados">
        <ion-icon name="search-circle"></ion-icon>Obtuvimos {gruas.length}{" "}
        resultados{" "}
      </small>
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
