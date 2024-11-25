import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePersonas } from "../../context/PersonasContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useObtenerPersonasPorFiltro({
  obtenerPersonasNuevamente,
}) {
  const { ObtenerPersonasPorFiltro } = usePersonas();

  const [personas, establecerPersonas] = useState([]);
  const [cargandoPersonas, establecerCargandoPersonas] = useState(true);
  const [filtroPersonas, establecerFiltroPersonas] = useState("");

  useEffect(() => {
    const obtenerPersonas = async () => {
      try {
        const res = await ObtenerPersonasPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroPersonas,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerPersonas(res.data);
        }
        establecerCargandoPersonas(false);
      } catch (error) {
        const { status, data } = error.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      }
    };
    obtenerPersonas();
  }, [filtroPersonas, obtenerPersonasNuevamente]);

  return {
    personas,
    cargandoPersonas,
    establecerFiltroPersonas,
  };
}
