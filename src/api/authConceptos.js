import axios from "./axios";

// SOLICITUD PARA REGISTRAR UN CONCEPTO
export const SolicitudRegistrarConcepto = (data) =>
  axios.post("/conceptos/RegistrarConcepto", data);
// SOLICITUD OBTENER CONCEPTOS POR FILTRO
export const SolicitudObtenerConceptosPorFiltro = (data) =>
  axios.post("/conceptos/ObtenerConceptosPorFiltro", data);
// SOLICITUD PARA ACTIVAR O DESACTIVAR UN CONCEPTO
export const SolicitudActivarDesactivarConcepto = (data) =>
  axios.post("/conceptos/ActivarDesactivarConcepto", data);
// SOLICITUD ACTUALIZAR CONCEPTO
export const SolicitudActualizarConcepto = (data) =>
  axios.put("/conceptos/ActualizarConcepto", data);
// SOLICITUD PARA OBTENER LOS CONCEPTOS ACTIVOS
export const SolicitudObtenerConceptosActivos = ({ CookieConToken }) =>
  axios.get(`/conceptos/ObtenerConceptosActivos/${CookieConToken}`);
