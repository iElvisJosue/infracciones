/* eslint-disable react/prop-types */
// CONTEXTOS A USAR
import { useDocumentos } from "../../context/DocumentosContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerDocumentosPorFiltro from "../../hooks/AdministrarDocumentos/useObtenerDocumentosPorFiltro";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

export default function AdministrarDocumentosListaDeDocumentos({
  obtenerDocumentosNuevamente,
  establecerObtenerDocumentosNuevamente,
  establecerVistaAdministrarDocumentos,
  establecerInformacionDelDocumento,
}) {
  const { ActivarDesactivarDocumento } = useDocumentos();
  const {
    documentos,
    cargandoDocumentos,
    // establecerFiltroDocumentos,
  } = useObtenerDocumentosPorFiltro({
    obtenerDocumentosNuevamente,
  });

  const PeticionActivarDesactivarDocumento = async (
    idListaDocumento,
    EstadoDocumentoParaBD
  ) => {
    try {
      const res = await ActivarDesactivarDocumento({
        idListaDocumento: idListaDocumento,
        EstadoDocumento: EstadoDocumentoParaBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerDocumentosNuevamente(!obtenerDocumentosNuevamente);
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
  const CambiarVistaParaEditarDocumento = (infDocumento) => {
    establecerInformacionDelDocumento(infDocumento);
    establecerVistaAdministrarDocumentos(1);
  };
  const ACTIVO = "Activo";

  if (cargandoDocumentos) return <Cargando />;

  return (
    <div className="AdministrarDocumentos__Lista">
      <h1 className="AdministrarDocumentos__Lista--Titulo">
        Lista de documentos <br /> 📃
      </h1>
      {documentos.length > 0 ? (
        <>
          <h3 className="AdministrarDocumentos__Lista__Subtitulo">
            Estatus de los documentos:
          </h3>
          <span className="AdministrarDocumentos__Clasificacion">
            <p className="AdministrarDocumentos__Clasificacion--Texto Activa">
              <ion-icon name="document-text"></ion-icon> Activo
            </p>
            <p className="AdministrarDocumentos__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivado
            </p>
          </span>
          {documentos.map((infDocumento) => (
            <section
              className={`AdministrarDocumentos__Documento ${
                infDocumento.ActivoDocumento === ACTIVO ? "Si" : "No"
              }`}
              key={infDocumento.idListaDocumento}
            >
              <span className="AdministrarDocumentos__Documento__Detalles">
                {infDocumento.ActivoDocumento === ACTIVO ? (
                  <img src="imagenes/Documentos.png" alt="" />
                ) : (
                  <img src="imagenes/Desactivado.png" alt="" />
                )}
                <p>DOC.</p>
                <p>{infDocumento.NombreDocumento}</p>
                <span
                  className={`AdministrarDocumentos__Documento__Detalles--Activa ${
                    infDocumento.ActivoDocumento === ACTIVO ? "Si" : "No"
                  }`}
                >
                  {infDocumento.ActivoDocumento === ACTIVO ? (
                    <button
                      title="Desactivar Documento"
                      onClick={() =>
                        PeticionActivarDesactivarDocumento(
                          infDocumento.idListaDocumento,
                          "Desactivado"
                        )
                      }
                    >
                      <ion-icon name="document-text"></ion-icon>
                    </button>
                  ) : (
                    <button
                      title="Activar Documento"
                      onClick={() =>
                        PeticionActivarDesactivarDocumento(
                          infDocumento.idListaDocumento,
                          "Activo"
                        )
                      }
                    >
                      <ion-icon name="ban"></ion-icon>
                    </button>
                  )}
                </span>
              </span>
              {infDocumento.ActivoDocumento === ACTIVO && (
                <span className="AdministrarDocumentos__Documento__Opciones">
                  <button
                    className="AdministrarDocumentos__Documento__Opciones--Boton"
                    title="Editar dcumento"
                    onClick={() => {
                      CambiarVistaParaEditarDocumento(infDocumento);
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
          ¡Vaya! No hemos encontrado ningún documento registrado.
        </SinResultados>
      )}
    </div>
  );
}
