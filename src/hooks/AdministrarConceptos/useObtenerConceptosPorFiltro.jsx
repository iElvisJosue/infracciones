import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConceptos } from "../../context/ConceptosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useObtenerConceptosPorFiltro({
  obtenerConceptosNuevamente,
}) {
  const { ObtenerConceptosPorFiltro } = useConceptos();

  const [conceptos, establecerConceptos] = useState([]);
  const [cargandoConceptos, establecerCargandoConceptos] = useState(true);
  const [filtroConceptos, establecerFiltroConceptos] = useState("");

  useEffect(() => {
    const obtenerConceptos = async () => {
      try {
        const res = await ObtenerConceptosPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroConceptos,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerConceptos(res.data);
        }
        establecerCargandoConceptos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerConceptos();
  }, [filtroConceptos, obtenerConceptosNuevamente]);

  return {
    conceptos,
    cargandoConceptos,
    establecerFiltroConceptos,
  };
}
