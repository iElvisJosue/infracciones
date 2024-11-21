import axios from "./axios";

// SOLICITUD PARA REGISTRAR UNA GRUA
export const SolicitudRegistrarGrua = (data) =>
  axios.post("/gruas/RegistrarGrua", data);
// SOLICITUD OBTENER GRÚAS POR FILTRO
export const SolicitudObtenerGruasPorFiltro = (data) =>
  axios.post("/gruas/ObtenerGruasPorFiltro", data);
// SOLICITUD DESACTIVAR/ACTIVAR GRÚA
export const SolicitudActivarDesactivarGrua = (data) =>
  axios.post("/gruas/ActivarDesactivarGrua", data);
// SOLICITUD ACTUALIZAR GRÚA
export const SolicitudActualizarGrua = (data) =>
  axios.put("/gruas/ActualizarGrua", data);
// SOLICITUD OBTENER GRÚAS ACTIVAS POR FILTRO
export const SolicitudObtenerGruasActivasPorFiltro = (data) =>
  axios.post("/gruas/ObtenerGruasActivasPorFiltro", data);
