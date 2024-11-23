/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";

// CONTEXTOS A USAR
import { useConceptos } from "../../context/ConceptosContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerConceptosPorFiltro from "../../hooks/AdministrarConceptos/useObtenerConceptosPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePagicacion";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// ESTILOS A USAR
import "../../styles/Componentes/AdministrarConceptos/AdministrarConceptosListaDeConceptos.css";

export default function AdministrarConceptosListaDeConceptos({
  obtenerConceptosNuevamente,
  establecerObtenerConceptosNuevamente,
  establecerVistaAdministrarConceptos,
  establecerInformacionDelConcepto,
}) {
  const { ActivarDesactivarConcepto } = useConceptos();
  const { conceptos, cargandoConceptos, establecerFiltroConceptos } =
    useObtenerConceptosPorFiltro({
      obtenerConceptosNuevamente,
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
    if (conceptos) {
      const CantidadDePaginasEnConceptos = Math.ceil(
        conceptos.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(CantidadDePaginasEnConceptos);
    }
  }, [conceptos]);

  const PeticionActivarDesactivarConcepto = async (
    idListaConcepto,
    EstadoConceptoParaBD
  ) => {
    try {
      const res = await ActivarDesactivarConcepto({
        idListaConcepto: idListaConcepto,
        EstadoConcepto: EstadoConceptoParaBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerConceptosNuevamente(!obtenerConceptosNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  };
  const BuscarConceptos = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroConceptos(valorIntroducido);
      reiniciarValores();
    }
  };
  const CambiarVistaParaEditarConcepto = (infConcepto) => {
    establecerInformacionDelConcepto(infConcepto);
    establecerVistaAdministrarConceptos(1);
  };
  const ACTIVO = "Activo";

  if (cargandoConceptos) return <Cargando />;

  return (
    <div className="AdministrarConceptos__Lista">
      <h1 className="AdministrarConceptos__Lista--Titulo">
        Lista de conceptos <br /> 📃
      </h1>
      <span className="AdministrarConceptos__Lista--Buscar">
        <input
          type="text"
          placeholder="Buscar concepto"
          onChange={BuscarConceptos}
        />
        <span className="AdministrarConceptos__Lista--Buscar--Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {conceptos.length > 0 ? (
        <>
          <h3 className="AdministrarConceptos__Lista__Subtitulo">
            Estatus de los conceptos:
          </h3>
          <span className="AdministrarConceptos__Lista__Clasificacion">
            <p className="AdministrarConceptos__Lista__Clasificacion--Texto Activa">
              <ion-icon name="help-circle"></ion-icon> Activo
            </p>
            <p className="AdministrarConceptos__Lista__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivado
            </p>
          </span>
          <small className="AdministrarConceptos__Lista--TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {conceptos.length} resultados{" "}
          </small>
          {conceptos.length > CantidadParaMostrar && (
            <ControlDePaginacion
              resultadosComponente={conceptos}
              paginaParaMostrar={paginaParaMostrar}
              cantidadDePaginas={cantidadDePaginas}
              CantidadParaMostrar={CantidadParaMostrar}
              MostrarVeinticincoMas={MostrarVeinticincoMas}
              MostrarVeinticincoMenos={MostrarVeinticincoMenos}
              indiceInicial={indiceInicial}
              indiceFinal={indiceFinal}
            />
          )}
          {conceptos.slice(indiceInicial, indiceFinal).map((infConcepto) => (
            <section
              className={`AdministrarConceptos__Lista__Concepto ${
                infConcepto.ActivoConcepto === ACTIVO ? "Si" : "No"
              }`}
              key={infConcepto.idListaConcepto}
            >
              <span className="AdministrarConceptos__Lista__Concepto__Detalles">
                {infConcepto.ActivoConcepto === ACTIVO ? (
                  <img src="imagenes/Conceptos.png" alt="Logo Concepto" />
                ) : (
                  <img src="imagenes/Desactivado.png" alt="Logo Desactivado" />
                )}
                <p>Concepto</p>
                <p>{infConcepto.NombreConcepto}</p>
                {infConcepto.ActivoConcepto === ACTIVO && (
                  <>
                    <p>Importe</p>
                    <p>
                      {infConcepto.ImporteConcepto.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </>
                )}
                <span
                  className={`AdministrarConceptos__Lista__Concepto__Detalles--Activa ${
                    infConcepto.ActivoConcepto === ACTIVO ? "Si" : "No"
                  }`}
                >
                  {infConcepto.ActivoConcepto === ACTIVO ? (
                    <button
                      title="Desactivar Concepto"
                      onClick={() =>
                        PeticionActivarDesactivarConcepto(
                          infConcepto.idListaConcepto,
                          "Desactivado"
                        )
                      }
                    >
                      <ion-icon name="help-circle"></ion-icon>
                    </button>
                  ) : (
                    <button
                      title="Activar Concepto"
                      onClick={() =>
                        PeticionActivarDesactivarConcepto(
                          infConcepto.idListaConcepto,
                          "Activo"
                        )
                      }
                    >
                      <ion-icon name="ban"></ion-icon>
                    </button>
                  )}
                </span>
              </span>
              {infConcepto.ActivoConcepto === ACTIVO && (
                <span className="AdministrarConceptos__Lista__Concepto__Opciones">
                  <button
                    className="AdministrarConceptos__Lista__Concepto__Opciones--Boton"
                    title="Editar Concepto"
                    onClick={() => {
                      CambiarVistaParaEditarConcepto(infConcepto);
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
          ¡Vaya! No hemos encontrado ningún concepto registrado.
        </SinResultados>
      )}
    </div>
  );
}
