/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";

// CONTEXTOS A USAR
import { useAgentes } from "../../context/AgentesContext";
import { useGlobal } from "../../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerAgentesPorFiltro from "../../hooks/AdministrarAgentes/useObtenerAgentesPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePagicacion";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

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
  const BuscarAgentes = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroAgentes(valorIntroducido);
      reiniciarValores();
    }
  };
  const CambiarVistaParaEditarAgente = (ingAgente) => {
    establecerInformacionDelAgente(ingAgente);
    establecerVistaAdministrarAgentes(1);
  };
  const ALTA = "Alta";
  const ADMINISTRADOR = "Administrador";

  if (cargandoAgentes) return <Cargando />;

  return (
    <div className="AdministrarAgentes__Lista">
      <h1 className="AdministrarAgentes__Lista--Titulo">
        Lista de agentes <br /> 📃
      </h1>
      <span className="AdministrarAgentes__Lista--Buscar">
        <input
          type="text"
          placeholder="Buscar agente"
          onChange={BuscarAgentes}
        />
        <span className="AdministrarAgentes__Lista--Buscar--Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {agentes.length > 0 ? (
        <>
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
          <small className="AdministrarAgentes__Lista--TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos {agentes.length}{" "}
            resultados{" "}
          </small>
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
                  <img src="imagenes/Agente.png" alt="Imagen de agente" />
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
                        <ion-icon name="shield-checkmark"></ion-icon>
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
