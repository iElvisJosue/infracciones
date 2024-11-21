import axios from "./axios";

// SOLICITUD PARA REGISTRAR UN AGENTE
export const SolicitudRegistrarAgente = (data) =>
  axios.post("/agentes/RegistrarAgente", data);
// SOLICITUD OBTENER AGENTES POR FILTRO
export const SolicitudObtenerAgentesPorFiltro = (data) =>
  axios.post("/agentes/ObtenerAgentesPorFiltro", data);
// SOLICITUD DESACTIVAR/ACTIVAR GRÚA
export const SolicitudActivarDesactivarAgente = (data) =>
  axios.post("/agentes/ActivarDesactivarAgente", data);
// SOLICITUD ACTUALIZAR GRÚA
export const SolicitudActualizarAgente = (data) =>
  axios.put("/agentes/ActualizarAgente", data);
