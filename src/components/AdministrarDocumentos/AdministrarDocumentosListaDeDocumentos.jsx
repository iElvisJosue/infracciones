/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// CONTEXTOS A USAR
import { useDocumentos } from "../../context/DocumentosContext";

// IMPORTAMOS LOS COMPONENTES
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";
import InputBusqueda from "../Globales/InputBusqueda";
import TextoResultados from "../Globales/TextoResultados";
import TituloSeccion from "../Globales/TituloSeccion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerDocumentosPorFiltro from "../../hooks/AdministrarDocumentos/useObtenerDocumentosPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// ESTILOS A USAR
import "../../styles/Componentes/AdministrarDocumentos/AdministrarDocumentosListaDeDocumentos.css";

export default function AdministrarDocumentosListaDeDocumentos({
  obtenerDocumentosNuevamente,
  establecerObtenerDocumentosNuevamente,
  establecerVistaAdministrarDocumentos,
  establecerInformacionDelDocumento,
}) {
  const { ActivarDesactivarDocumento } = useDocumentos();
  const [mostrarLista, establecerMostrarLista] = useState(true);
  const { documentos, cargandoDocumentos, establecerFiltroDocumentos } =
    useObtenerDocumentosPorFiltro({
      obtenerDocumentosNuevamente,
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
    if (documentos) {
      const CantidadDePaginasEnDocumentos = Math.ceil(
        documentos.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(CantidadDePaginasEnDocumentos);
    }
  }, [documentos]);

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
  const CambiarVistaParaEditarDocumento = (infDocumento) => {
    establecerInformacionDelDocumento(infDocumento);
    establecerVistaAdministrarDocumentos(1);
  };

  const claseLista = mostrarLista
    ? "AdministrarDocumentos__Lista"
    : "AdministrarDocumentos__Lista Ocultar";
  const ACTIVO = "Activo";

  if (cargandoDocumentos) return <Cargando />;

  return (
    <div className={claseLista}>
      <TituloSeccion
        mostrarBoton={true}
        mostrarContenido={mostrarLista}
        establecerMostrarContenido={establecerMostrarLista}
      >
        Lista de documentos
      </TituloSeccion>
      <InputBusqueda
        establecerFiltro={establecerFiltroDocumentos}
        placeholder="Nombre del documento"
        reiniciarValores={reiniciarValores}
      />
      {documentos.length > 0 ? (
        <>
          <TextoResultados listaContenido={documentos} />
          <h3 className="AdministrarDocumentos__Lista__Subtitulo">
            Estatus de los documentos:
          </h3>
          <span className="AdministrarDocumentos__Lista__Clasificacion">
            <p className="AdministrarDocumentos__Lista__Clasificacion--Texto Activa">
              <ion-icon name="document-text"></ion-icon> Activo
            </p>
            <p className="AdministrarDocumentos__Lista__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivado
            </p>
          </span>
          {documentos.length > CantidadParaMostrar && (
            <ControlDePaginacion
              resultadosComponente={documentos}
              paginaParaMostrar={paginaParaMostrar}
              cantidadDePaginas={cantidadDePaginas}
              CantidadParaMostrar={CantidadParaMostrar}
              MostrarVeinticincoMas={MostrarVeinticincoMas}
              MostrarVeinticincoMenos={MostrarVeinticincoMenos}
              indiceInicial={indiceInicial}
              indiceFinal={indiceFinal}
            />
          )}
          {documentos.slice(indiceInicial, indiceFinal).map((infDocumento) => (
            <section
              className={`AdministrarDocumentos__Lista__Documento ${
                infDocumento.ActivoDocumento === ACTIVO ? "Si" : "No"
              }`}
              key={infDocumento.idListaDocumento}
            >
              <span className="AdministrarDocumentos__Lista__Documento__Detalles">
                {infDocumento.ActivoDocumento === ACTIVO ? (
                  <img src="imagenes/Documentos.png" alt="" />
                ) : (
                  <img src="imagenes/Desactivado.png" alt="" />
                )}
                <p>DOC.</p>
                <p>{infDocumento.NombreDocumento}</p>
                <span
                  className={`AdministrarDocumentos__Lista__Documento__Detalles--Activa ${
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
                <span className="AdministrarDocumentos__Lista__Documento__Opciones">
                  <button
                    className="AdministrarDocumentos__Lista__Documento__Opciones--Boton"
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
