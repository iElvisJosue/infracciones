/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// CONTEXTOS A USAR
import { usePersonas } from "../../context/PersonasContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";
import InputBusqueda from "../Globales/InputBusqueda";
import TextoResultados from "../Globales/TextoResultados";
import TituloSeccion from "../Globales/TituloSeccion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPersonasPorFiltro from "../../hooks/AdministrarPersonas/useObtenerPersonasPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// ESTILOS A USAR
import "../../styles/Componentes/AdministrarPersonas/AdministrarPersonasListaDePersonas.css";

export default function AdministrarPersonasListaDePersonas({
  obtenerPersonasNuevamente,
  establecerObtenerPersonasNuevamente,
  establecerVistaAdministrarPersonas,
  establecerInformacionDeLaPersona,
}) {
  const { ActivarDesactivarPersona } = usePersonas();
  const [mostrarLista, establecerMostrarLista] = useState(true);
  const { personas, cargandoPersonas, establecerFiltroPersonas } =
    useObtenerPersonasPorFiltro({
      obtenerPersonasNuevamente,
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
    if (personas) {
      const CantidadDePaginasEnPersonas = Math.ceil(
        personas.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(CantidadDePaginasEnPersonas);
    }
  }, [personas]);

  const PeticionActivarDesactivarPersona = async (
    idPersona,
    EstadoPersonaParaBD
  ) => {
    try {
      const res = await ActivarDesactivarPersona({
        idPersona: idPersona,
        EstadoPersona: EstadoPersonaParaBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerPersonasNuevamente(!obtenerPersonasNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  };
  const CambiarVistaParaEditarPersona = (infPersona) => {
    establecerInformacionDeLaPersona(infPersona);
    establecerVistaAdministrarPersonas(1);
  };

  const claseLista = mostrarLista
    ? "AdministrarPersonas__Lista"
    : "AdministrarPersonas__Lista Ocultar";
  const ACTIVA = "Activa";

  if (cargandoPersonas) return <Cargando />;

  return (
    <div className={claseLista}>
      <TituloSeccion
        mostrarBoton={true}
        mostrarContenido={mostrarLista}
        establecerMostrarContenido={establecerMostrarLista}
      >
        Lista de personas
      </TituloSeccion>
      <InputBusqueda
        establecerFiltro={establecerFiltroPersonas}
        placeholder="Buscar persona"
        reiniciarValores={reiniciarValores}
      />
      {personas.length > 0 ? (
        <>
          <TextoResultados listaContenido={personas} />
          <h3 className="AdministrarPersonas__Lista__Subtitulo">
            Estatus de las personas:
          </h3>
          <span className="AdministrarPersonas__Lista__Clasificacion">
            <p className="AdministrarPersonas__Lista__Clasificacion--Texto Activa">
              <ion-icon name="person-circle"></ion-icon> Activa
            </p>
            <p className="AdministrarPersonas__Lista__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivada
            </p>
          </span>
          {personas.length > CantidadParaMostrar && (
            <ControlDePaginacion
              resultadosComponente={personas}
              paginaParaMostrar={paginaParaMostrar}
              cantidadDePaginas={cantidadDePaginas}
              CantidadParaMostrar={CantidadParaMostrar}
              MostrarVeinticincoMas={MostrarVeinticincoMas}
              MostrarVeinticincoMenos={MostrarVeinticincoMenos}
              indiceInicial={indiceInicial}
              indiceFinal={indiceFinal}
            />
          )}
          {personas.slice(indiceInicial, indiceFinal).map((infPersona) => (
            <section
              className={`AdministrarPersonas__Lista__Persona ${
                infPersona.ActivaPersona === ACTIVA ? "Si" : "No"
              }`}
              key={infPersona.idPersona}
            >
              <span className="AdministrarPersonas__Lista__Persona__Detalles">
                {infPersona.ActivaPersona === ACTIVA ? (
                  <img
                    src="imagenes/AdministrarPersonas.png"
                    alt="Persona activa"
                  />
                ) : (
                  <img
                    src="imagenes/Desactivado.png"
                    alt="Persona desactivada"
                  />
                )}
                <p>Nombre</p>
                <p>
                  {infPersona.NombrePersona} {infPersona.ApellidoPaternoPersona}{" "}
                  {infPersona.ApellidoMaternoPersona}
                </p>
                {infPersona.ActivaPersona === ACTIVA && (
                  <>
                    <p>RFC</p>
                    <p>{infPersona.RFCPersona.toUpperCase()}</p>
                    <p>CURP</p>
                    <p>{infPersona.CURPPersona.toUpperCase()}</p>
                  </>
                )}
                <span
                  className={`AdministrarPersonas__Lista__Persona__Detalles--Activa ${
                    infPersona.ActivaPersona === ACTIVA ? "Si" : "No"
                  }`}
                >
                  {infPersona.ActivaPersona === ACTIVA ? (
                    <button
                      title="Desactivar Persona"
                      onClick={() =>
                        PeticionActivarDesactivarPersona(
                          infPersona.idPersona,
                          "Desactivada"
                        )
                      }
                    >
                      <ion-icon name="person-circle"></ion-icon>
                    </button>
                  ) : (
                    <button
                      title="Activar Persona"
                      onClick={() =>
                        PeticionActivarDesactivarPersona(
                          infPersona.idPersona,
                          "Activa"
                        )
                      }
                    >
                      <ion-icon name="ban"></ion-icon>
                    </button>
                  )}
                </span>
              </span>
              {infPersona.ActivaPersona === ACTIVA && (
                <span className="AdministrarPersonas__Lista__Persona__Opciones">
                  <button
                    className="AdministrarPersonas__Lista__Persona__Opciones--Boton"
                    title="Editar Persona"
                    onClick={() => {
                      CambiarVistaParaEditarPersona(infPersona);
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
          ¡Vaya! No hemos encontrado ninguna persona registrada.
        </SinResultados>
      )}
    </div>
  );
}
