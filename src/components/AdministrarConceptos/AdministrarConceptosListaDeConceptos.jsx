/* eslint-disable react/prop-types */
// CONTEXTOS A USAR
import { useConceptos } from "../../context/ConceptosContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerConceptosPorFiltro from "../../hooks/AdministrarConceptos/useObtenerConceptosPorFiltro";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

export default function AdministrarConceptosListaDeConceptos({
  obtenerConceptosNuevamente,
  establecerObtenerConceptosNuevamente,
  establecerVistaAdministrarConceptos,
  establecerInformacionDelConcepto,
}) {
  const { ActivarDesactivarConcepto } = useConceptos();
  const {
    conceptos,
    cargandoConceptos,
    // establecerFiltroConceptos,
  } = useObtenerConceptosPorFiltro({
    obtenerConceptosNuevamente,
  });

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
      {conceptos.length > 0 ? (
        <>
          <h3 className="AdministrarConceptos__Lista__Subtitulo">
            Estatus de los conceptos:
          </h3>
          <span className="AdministrarConceptos__Clasificacion">
            <p className="AdministrarConceptos__Clasificacion--Texto Activa">
              <ion-icon name="help-circle"></ion-icon> Activo
            </p>
            <p className="AdministrarConceptos__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivado
            </p>
          </span>
          {conceptos.map((infConcepto) => (
            <section
              className={`AdministrarConceptos__Concepto ${
                infConcepto.ActivoConcepto === ACTIVO ? "Si" : "No"
              }`}
              key={infConcepto.idListaConcepto}
            >
              <span className="AdministrarConceptos__Concepto__Detalles">
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
                  className={`AdministrarConceptos__Concepto__Detalles--Activa ${
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
                <span className="AdministrarConceptos__Concepto__Opciones">
                  <button
                    className="AdministrarConceptos__Concepto__Opciones--Boton"
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
