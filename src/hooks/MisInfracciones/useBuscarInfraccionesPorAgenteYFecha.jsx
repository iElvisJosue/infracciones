// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { useInfracciones } from "../../context/InfraccionesContext";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { ObtenerFechaActual } from "../../helpers/Generales/Funciones";

export default function useBuscarInfraccionesPorAgenteYFecha({ idAgente }) {
  const { BuscarInfraccionesPorAgenteYFecha } = useInfracciones();
  const [infraccionesPorFecha, establecerInfraccionesPorFecha] = useState([]);
  const [cargandoInfraccionesPorFecha, establecerCargandoInfraccionesPorFecha] =
    useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  useEffect(() => {
    async function obtenerInfraccionesPorFecha() {
      try {
        const res = await BuscarInfraccionesPorAgenteYFecha({
          CookieConToken: COOKIE_CON_TOKEN,
          idAgente,
          primeraFecha,
          segundaFecha,
        });
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        } else {
          establecerInfraccionesPorFecha(res.data);
        }
        establecerCargandoInfraccionesPorFecha(false);
      } catch (error) {
        const { status, data } = error.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      }
    }
    obtenerInfraccionesPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    infraccionesPorFecha,
    cargandoInfraccionesPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  };
}
