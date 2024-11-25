import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInfracciones } from "../../context/InfraccionesContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useObtenerConceptosDocumentosEvidencias({
  idInfraccion,
}) {
  const { BuscarConceptosDocumentosEvidencias } = useInfracciones();

  const [
    conceptosDocumentosEvidencias,
    establecerConceptosDocumentosEvidencias,
  ] = useState(null);
  const [
    cargandoConceptosDocumentosEvidencias,
    establecerCargandoConceptosDocumentosEvidencias,
  ] = useState(true);

  useEffect(() => {
    const buscarConceptosDocumentosEvidencias = async () => {
      try {
        const res = await BuscarConceptosDocumentosEvidencias({
          CookieConToken: COOKIE_CON_TOKEN,
          idInfraccion,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerConceptosDocumentosEvidencias(res.data);
        }
        establecerCargandoConceptosDocumentosEvidencias(false);
      } catch (error) {
        const { status, data } = error.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      }
    };
    buscarConceptosDocumentosEvidencias();
  }, []);

  return {
    conceptosDocumentosEvidencias,
    cargandoConceptosDocumentosEvidencias,
  };
}
