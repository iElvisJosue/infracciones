import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInfracciones } from "../../context/InfraccionesContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";

export default function useBuscarInfraccionesPorFiltro() {
  const { BuscarInfraccionesPorFiltro } = useInfracciones();

  const [infracciones, establecerInfracciones] = useState([]);
  const [cargandoInfracciones, establecerCargandoInfracciones] = useState(true);
  const [filtroInfracciones, establecerFiltroInfracciones] = useState("");

  useEffect(() => {
    const buscarInfracciones = async () => {
      try {
        const res = await BuscarInfraccionesPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroInfracciones,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerInfracciones(res.data);
        }
        establecerCargandoInfracciones(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarInfracciones();
  }, [filtroInfracciones]);

  return {
    infracciones,
    cargandoInfracciones,
    filtroInfracciones,
    establecerFiltroInfracciones,
  };
}
