import axios from "./axios";

// SOLICITUD PARA REGISTRAR UNA PERSONA
export const SolicitudRegistrarPersona = (data) =>
  axios.post("/personas/RegistrarPersona", data);
// SOLICITUD OBTENER PERSONAS POR FILTRO
export const SolicitudObtenerPersonasPorFiltro = (data) =>
  axios.post("/personas/ObtenerPersonasPorFiltro", data);
// SOLICITUD DESACTIVAR/ACTIVAR PERSONA
export const SolicitudActivarDesactivarPersona = (data) =>
  axios.post("/personas/ActivarDesactivarPersona", data);
// SOLICITUD ACTUALIZAR PERSONA
export const SolicitudActualizarPersona = (data) =>
  axios.put("/personas/ActualizarPersona", data);
// SOLICITUD OBTENER PERSONAS ACTIVAS POR FILTRO
export const SolicitudObtenerPersonasActivasPorFiltro = (data) =>
  axios.post("/personas/ObtenerPersonasActivasPorFiltro", data);
