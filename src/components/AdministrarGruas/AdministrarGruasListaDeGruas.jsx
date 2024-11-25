/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// CONTEXTOS A USAR
import { useGruas } from "../../context/GruasContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";
import InputBusqueda from "../Globales/InputBusqueda";
import TextoResultados from "../Globales/TextoResultados";
import TituloSeccion from "../Globales/TituloSeccion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerGruasPorFiltro from "../../hooks/AdministrarGruas/useObtenerGruasPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// ESTILOS A USAR
import "../../styles/Componentes/AdministrarGruas/AdministrarGruasListaDeGruas.css";

export default function AdministrarGruasListaDeGruas({
  obtenerGruasNuevamente,
  establecerObtenerGruasNuevamente,
  establecerVistaAdministrarGruas,
  establecerInformacionDeLaGrua,
}) {
  const { ActivarDesactivarGrua } = useGruas();
  const [mostrarLista, establecerMostrarLista] = useState(true);
  const { gruas, cargandoGruas, establecerFiltroGruas } =
    useObtenerGruasPorFiltro({
      obtenerGruasNuevamente,
    });
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

  const PeticionActivarDesactivarGrua = async (idGrua, EstadoGruaParaBD) => {
    try {
      const res = await ActivarDesactivarGrua({
        idGrua: idGrua,
        EstadoGrua: EstadoGruaParaBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerGruasNuevamente(!obtenerGruasNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  };
  const CambiarVistaParaEditarGrua = (infGrua) => {
    establecerInformacionDeLaGrua(infGrua);
    establecerVistaAdministrarGruas(1);
  };

  const claseLista = mostrarLista
    ? "AdministrarGruas__Lista"
    : "AdministrarGruas__Lista Ocultar";
  const SI = "Si";

  if (cargandoGruas) return <Cargando />;

  return (
    <div className={claseLista}>
      <TituloSeccion
        mostrarBoton={true}
        mostrarContenido={mostrarLista}
        establecerMostrarContenido={establecerMostrarLista}
      >
        Lista de grúas
      </TituloSeccion>
      <InputBusqueda
        establecerFiltro={establecerFiltroGruas}
        placeholder="Buscar grúa"
        reiniciarValores={reiniciarValores}
      />
      {gruas.length > 0 ? (
        <>
          <TextoResultados listaContenido={gruas} />
          <h3 className="AdministrarGruas__Lista__Subtitulo">
            Estatus de las grúas:
          </h3>
          <span className="AdministrarGruas__Lista__Clasificacion">
            <p className="AdministrarGruas__Lista__Clasificacion--Texto Activa">
              <ion-icon name="hammer"></ion-icon> Activa
            </p>
            <p className="AdministrarGruas__Lista__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivada
            </p>
          </span>
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
          {gruas.slice(indiceInicial, indiceFinal).map((infGrua) => (
            <section
              className={`AdministrarGruas__Lista__Grua ${
                infGrua.ActivaGrua === SI ? "Si" : "No"
              }`}
              key={infGrua.idGrua}
            >
              <span className="AdministrarGruas__Lista__Grua__Detalles">
                {infGrua.ActivaGrua === SI ? (
                  <img src="imagenes/Gruas.png" alt="Imagen de la grua" />
                ) : (
                  <img
                    src="imagenes/Desactivado.png"
                    alt="Imagen desactivada"
                  />
                )}
                {infGrua.ActivaGrua === SI && (
                  <>
                    <p>Clave</p>
                    <p>{infGrua.idGrua}</p>
                  </>
                )}
                <p>Nombre</p>
                <p>{infGrua.NombreGrua}</p>
                <span
                  className={`AdministrarGruas__Lista__Grua__Detalles--Activa ${
                    infGrua.ActivaGrua === SI ? "Si" : "No"
                  }`}
                >
                  {infGrua.ActivaGrua === SI ? (
                    <button
                      title="Desactivar Grúa"
                      onClick={() =>
                        PeticionActivarDesactivarGrua(infGrua.idGrua, "No")
                      }
                    >
                      <ion-icon name="checkmark-done"></ion-icon>
                    </button>
                  ) : (
                    <button
                      title="Activar Grúa"
                      onClick={() =>
                        PeticionActivarDesactivarGrua(infGrua.idGrua, "Si")
                      }
                    >
                      <ion-icon name="ban"></ion-icon>
                    </button>
                  )}
                </span>
              </span>
              {infGrua.ActivaGrua === SI && (
                <span className="AdministrarGruas__Lista__Grua__Opciones">
                  <button
                    className="AdministrarGruas__Lista__Grua__Opciones--Boton"
                    title="Editar grúa"
                    onClick={() => {
                      CambiarVistaParaEditarGrua(infGrua);
                    }}
                  >
                    <ion-icon name="create"></ion-icon>
                  </button>
                </span>
              )}
            </section>
          ))}
        </>
      ) : (
        <SinResultados>
          ¡Vaya! No hemos encontrado ninguna grúa registrada.
        </SinResultados>
      )}
    </div>
  );
}
