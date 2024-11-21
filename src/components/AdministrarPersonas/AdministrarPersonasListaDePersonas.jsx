/* eslint-disable react/prop-types */
// CONTEXTOS A USAR
import { usePersonas } from "../../context/PersonasContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPersonasPorFiltro from "../../hooks/AdministrarPersonas/useObtenerPersonasPorFiltro";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

export default function AdministrarPersonasListaDePersonas({
  obtenerPersonasNuevamente,
  establecerObtenerPersonasNuevamente,
  establecerVistaAdministrarPersonas,
  establecerInformacionDeLaPersona,
}) {
  const { ActivarDesactivarPersona } = usePersonas();
  const {
    personas,
    cargandoPersonas,
    // establecerFiltroPersonas,
  } = useObtenerPersonasPorFiltro({
    obtenerPersonasNuevamente,
  });

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
  // const ObtenerLosProductos = (event) => {
  //   const valorIntroducido = event.target.value;
  //   // Utilizamos una expresión regular para permitir letras, números y "-"
  //   const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
  //   // Comprobamos si el nuevo valor cumple con la expresión regular
  //   if (regex.test(valorIntroducido)) {
  //     establecerFiltroProductos(valorIntroducido);
  //     reiniciarValores();
  //   }
  // };
  const CambiarVistaParaEditarPersona = (infPersona) => {
    establecerInformacionDeLaPersona(infPersona);
    establecerVistaAdministrarPersonas(1);
  };
  const ACTIVA = "Activa";

  if (cargandoPersonas) return <Cargando />;

  return (
    <div className="AdministrarPersonas__Lista">
      <h1 className="AdministrarPersonas__Lista--Titulo">
        Lista de personas <br /> 📃
      </h1>
      {personas.length > 0 ? (
        <>
          <h3 className="AdministrarPersonas__Lista__Subtitulo">
            Estatus de las personas:
          </h3>
          <span className="AdministrarPersonas__Clasificacion">
            <p className="AdministrarPersonas__Clasificacion--Texto Activa">
              <ion-icon name="person-circle"></ion-icon> Activa
            </p>
            <p className="AdministrarPersonas__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivada
            </p>
          </span>
          {personas.map((infPersona) => (
            <section
              className={`AdministrarPersonas__Persona ${
                infPersona.ActivaPersona === ACTIVA ? "Si" : "No"
              }`}
              key={infPersona.idPersona}
            >
              <span className="AdministrarPersonas__Persona__Detalles">
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
                  className={`AdministrarPersonas__Persona__Detalles--Activa ${
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
                <span className="AdministrarPersonas__Persona__Opciones">
                  <button
                    className="AdministrarPersonas__Persona__Opciones--Boton"
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
