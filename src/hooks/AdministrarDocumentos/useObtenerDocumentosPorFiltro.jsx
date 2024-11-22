import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDocumentos } from "../../context/DocumentosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useObtenerDocumentosPorFiltro({
  obtenerDocumentosNuevamente,
}) {
  const { ObtenerDocumentosPorFiltro } = useDocumentos();

  const [documentos, establecerDocumentos] = useState([]);
  const [cargandoDocumentos, establecerCargandoDocumentos] = useState(true);
  const [filtroDocumentos, establecerFiltroDocumentos] = useState("");

  useEffect(() => {
    const obtenerDocumentos = async () => {
      try {
        const res = await ObtenerDocumentosPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroDocumentos,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerDocumentos(res.data);
        }
        establecerCargandoDocumentos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDocumentos();
  }, [filtroDocumentos, obtenerDocumentosNuevamente]);

  return {
    documentos,
    cargandoDocumentos,
    establecerFiltroDocumentos,
  };
}
