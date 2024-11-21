import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGruas } from "../../context/GruasContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useObtenerGruasActivarPorFiltro() {
  const { ObtenerGruasActivasPorFiltro } = useGruas();

  const [gruas, establecerGruas] = useState([]);
  const [cargandoGruas, establecerCargandoGruas] = useState(true);
  const [filtroGruas, establecerFiltroGruas] = useState("");

  useEffect(() => {
    const obtenerGruas = async () => {
      try {
        const res = await ObtenerGruasActivasPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroGruas,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerGruas(res.data);
        }
        establecerCargandoGruas(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGruas();
  }, [filtroGruas]);

  return {
    gruas,
    cargandoGruas,
    establecerFiltroGruas,
  };
}
