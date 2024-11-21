import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgentes } from "../../context/AgentesContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useObtenerAgentesPorFiltro({
  obtenerAgentesNuevamente,
  idAgenteLogueado,
}) {
  const { ObtenerAgentesPorFiltro } = useAgentes();

  const [agentes, establecerAgentes] = useState([]);
  const [cargandoAgentes, establecerCargandoAgentes] = useState(true);
  const [filtroAgentes, establecerFiltroAgentes] = useState("");

  useEffect(() => {
    const obtenerAgentes = async () => {
      try {
        const res = await ObtenerAgentesPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          idAgenteLogueado,
          filtro: filtroAgentes,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerAgentes(res.data);
        }
        establecerCargandoAgentes(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerAgentes();
  }, [filtroAgentes, obtenerAgentesNuevamente]);

  return {
    agentes,
    cargandoAgentes,
    establecerFiltroAgentes,
  };
}
