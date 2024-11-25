import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDocumentos } from "../../context/DocumentosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useObtenerDocumentosActivos() {
  const { ObtenerDocumentosActivos } = useDocumentos();
  const [documentos, establecerDocumentos] = useState([]);

  useEffect(() => {
    const obtenerDocumentos = async () => {
      try {
        const res = await ObtenerDocumentosActivos({
          CookieConToken: COOKIE_CON_TOKEN,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerDocumentos(res.data);
        }
      } catch (error) {
        const { status, data } = error.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      }
    };
    obtenerDocumentos();
  }, []);

  return {
    documentos,
  };
}
