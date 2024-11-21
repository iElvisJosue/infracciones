import axios from "./axios";

// SOLICITUD PARA OBTENER LOS CONCEPTOS ACTIVOS
export const SolicitudObtenerConceptosActivos = ({ CookieConToken }) =>
  axios.get(`/conceptos/ObtenerConceptosActivos/${CookieConToken}`);
