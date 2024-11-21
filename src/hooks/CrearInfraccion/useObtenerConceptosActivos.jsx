import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConceptos } from "../../context/ConceptosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useObtenerConceptosActivos() {
  const { ObtenerConceptosActivos } = useConceptos();
  const [conceptos, establecerConceptos] = useState([]);

  useEffect(() => {
    const obtenerConceptos = async () => {
      try {
        const res = await ObtenerConceptosActivos({
          CookieConToken: COOKIE_CON_TOKEN,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerConceptos(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerConceptos();
  }, []);

  return {
    conceptos,
  };
}
