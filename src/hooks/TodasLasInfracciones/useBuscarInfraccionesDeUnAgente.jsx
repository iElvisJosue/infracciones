import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInfracciones } from "../../context/InfraccionesContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useBuscarInfraccionesDeUnAgente(idAgente) {
  const { BuscarInfraccionesDeUnAgente } = useInfracciones();

  const [infraccionesDelAgente, establecerInfraccionesDelAgente] = useState([]);
  const [
    cargandoInfraccionesDelAgente,
    establecerCargandoInfraccionesDelAgente,
  ] = useState(true);

  useEffect(() => {
    const buscarInfracciones = async () => {
      try {
        const res = await BuscarInfraccionesDeUnAgente({
          CookieConToken: COOKIE_CON_TOKEN,
          idAgente,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerInfraccionesDelAgente(res.data);
        }
        establecerCargandoInfraccionesDelAgente(false);
      } catch (error) {
        const { status, data } = error.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      }
    };
    buscarInfracciones();
  }, []);

  return {
    infraccionesDelAgente,
    cargandoInfraccionesDelAgente,
  };
}
