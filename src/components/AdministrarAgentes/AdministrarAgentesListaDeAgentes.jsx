/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// CONTEXTOS A USAR
import { useAgentes } from "../../context/AgentesContext";
import { useGlobal } from "../../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";
import InputBusqueda from "../Globales/InputBusqueda";
import TextoResultados from "../Globales/TextoResultados";
import TituloSeccion from "../Globales/TituloSeccion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerAgentesPorFiltro from "../../hooks/AdministrarAgentes/useObtenerAgentesPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { HOST_IMG_AGENTES } from "../../helpers/Generales/Urls";

// ESTILOS A USAR
import "../../styles/Componentes/AdministrarAgentes/AdministrarAgentesListaDeAgentes.css";

export default function AdministrarAgentesListaDeAgentes({
  obtenerAgentesNuevamente,
  establecerObtenerAgentesNuevamente,
  establecerVistaAdministrarAgentes,
  establecerInformacionDelAgente,
}) {
  const { ActivarDesactivarAgente } = useAgentes();
  const { agente } = useGlobal();
  const [mostrarLista, establecerMostrarLista] = useState(true);
  const { agentes, cargandoAgentes, establecerFiltroAgentes } =
    useObtenerAgentesPorFiltro({
      obtenerAgentesNuevamente,
      idAgenteLogueado: agente?.idAgente,
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
    if (agentes) {
      const CantidadDePaginasEnAgentes = Math.ceil(
        agentes.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(CantidadDePaginasEnAgentes);
    }
  }, [agentes]);

  const PeticionActivarDesactivarAgente = async (
    idAgente,
    EstadoAgenteParaBD
  ) => {
    try {
      const res = await ActivarDesactivarAgente({
        idAgente: idAgente,
        EstadoAgente: EstadoAgenteParaBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerAgentesNuevamente(!obtenerAgentesNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  };
  const CambiarVistaParaEditarAgente = (ingAgente) => {
    establecerInformacionDelAgente(ingAgente);
    establecerVistaAdministrarAgentes(1);
  };

  const claseLista = mostrarLista
    ? "AdministrarAgentes__Lista"
    : "AdministrarAgentes__Lista Ocultar";
  const ALTA = "Alta";
  const ADMINISTRADOR = "Administrador";

  if (cargandoAgentes) return <Cargando />;

  return (
    <div className={claseLista}>
      <TituloSeccion
        mostrarBoton={true}
        mostrarContenido={mostrarLista}
        establecerMostrarContenido={establecerMostrarLista}
      >
        Lista de agentes
      </TituloSeccion>
      <InputBusqueda
        establecerFiltro={establecerFiltroAgentes}
        placeholder="Buscar agente"
        reiniciarValores={reiniciarValores}
      />
      {agentes.length > 0 ? (
        <>
          <TextoResultados listaContenido={agentes} />
          <h3 className="AdministrarAgentes__Lista__Subtitulo">
            Estatus de los agentes:
          </h3>
          <span className="AdministrarAgentes__Lista__Clasificacion">
            <p className="AdministrarAgentes__Lista__Clasificacion--Texto Activa">
              <ion-icon name="checkmark-done-circle"></ion-icon> Alta
            </p>
            <p className="AdministrarAgentes__Lista__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Baja
            </p>
            <p className="AdministrarAgentes__Lista__Clasificacion--Texto Administrador">
              <ion-icon name="shield-checkmark"></ion-icon> Administrador
            </p>
          </span>
          {agentes.length > CantidadParaMostrar && (
            <ControlDePaginacion
              resultadosComponente={agentes}
              paginaParaMostrar={paginaParaMostrar}
              cantidadDePaginas={cantidadDePaginas}
              CantidadParaMostrar={CantidadParaMostrar}
              MostrarVeinticincoMas={MostrarVeinticincoMas}
              MostrarVeinticincoMenos={MostrarVeinticincoMenos}
              indiceInicial={indiceInicial}
              indiceFinal={indiceFinal}
            />
          )}
          {agentes.slice(indiceInicial, indiceFinal).map((infAgente) => (
            <section
              className={`AdministrarAgentes__Lista__Agente ${
                infAgente.EstatusAgente === ALTA ? "Si" : "No"
              } ${infAgente.TipoPerfilAgente}`}
              key={infAgente.idAgente}
            >
              <span className="AdministrarAgentes__Lista__Agente__Detalles">
                {infAgente.EstatusAgente === ALTA ? (
                  <img
                    src={`${HOST_IMG_AGENTES}${infAgente.FotoAgente}`}
                    alt="Imagen de agente"
                  />
                ) : (
                  <img
                    src="imagenes/Desactivado.png"
                    alt="Imagen desactivada"
                  />
                )}
                <p>Clave Interna</p>
                <p>{infAgente.ClaveInternaAgente}</p>
                {infAgente.EstatusAgente === ALTA && (
                  <>
                    <p>Nombre</p>
                    <p>
                      {infAgente.NombreAgente} {infAgente.ApellidosAgente}
                    </p>
                  </>
                )}
                {infAgente.TipoPerfilAgente !== ADMINISTRADOR && (
                  <span
                    className={`AdministrarAgentes__Lista__Agente__Detalles--Activa ${
                      infAgente.EstatusAgente === ALTA ? "Si" : "No"
                    }`}
                  >
                    {infAgente.EstatusAgente === ALTA ? (
                      <button
                        title="Baja Agente"
                        onClick={() =>
                          PeticionActivarDesactivarAgente(
                            infAgente.idAgente,
                            "Baja"
                          )
                        }
                      >
                        <ion-icon name="checkmark-done-circle"></ion-icon>
                      </button>
                    ) : (
                      <button
                        title="Alta Agente"
                        onClick={() =>
                          PeticionActivarDesactivarAgente(
                            infAgente.idAgente,
                            "Alta"
                          )
                        }
                      >
                        <ion-icon name="ban"></ion-icon>
                      </button>
                    )}
                  </span>
                )}
              </span>
              {infAgente.TipoPerfilAgente !== ADMINISTRADOR &&
                infAgente.EstatusAgente === ALTA && (
                  <span className="AdministrarAgentes__Lista__Agente__Opciones">
                    <button
                      className="AdministrarAgentes__Lista__Agente__Opciones--Boton"
                      title="Editar agente"
                      onClick={() => {
                        CambiarVistaParaEditarAgente(infAgente);
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
          ¡Vaya! No hemos encontrado ningún agente registrado.
        </SinResultados>
      )}
    </div>
  );
}
