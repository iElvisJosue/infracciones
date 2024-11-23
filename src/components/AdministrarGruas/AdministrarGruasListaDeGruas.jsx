/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";

// CONTEXTOS A USAR
import { useGruas } from "../../context/GruasContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerGruasPorFiltro from "../../hooks/AdministrarGruas/useObtenerGruasPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePagicacion";

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
  const CambiarVistaParaEditarGrua = (infGrua) => {
    establecerInformacionDeLaGrua(infGrua);
    establecerVistaAdministrarGruas(1);
  };
  const SI = "Si";

  if (cargandoGruas) return <Cargando />;

  return (
    <div className="AdministrarGruas__Lista">
      <h1 className="AdministrarGruas__Lista--Titulo">
        Lista de grúas <br /> 📃
      </h1>
      <span className="AdministrarGruas__Lista--Buscar">
        <input type="text" placeholder="Buscar grúa" onChange={BuscarGruas} />
        <span className="AdministrarGruas__Lista--Buscar--Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {gruas.length > 0 ? (
        <>
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
          <small className="AdministrarGruas__Lista--TextoResultados">
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
