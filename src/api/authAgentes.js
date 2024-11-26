import axios from "./axios";

// SOLICITUD PARA REGISTRAR UN AGENTE
export const SolicitudRegistrarAgente = (data) =>
  axios.post("/agentes/RegistrarAgente", data);
// SOLICITUD OBTENER AGENTES POR FILTRO
export const SolicitudObtenerAgentesPorFiltro = (data) =>
  axios.post("/agentes/ObtenerAgentesPorFiltro", data);
// SOLICITUD DESACTIVAR/ACTIVAR AGENTE
export const SolicitudActivarDesactivarAgente = (data) =>
  axios.post("/agentes/ActivarDesactivarAgente", data);
// SOLICITUD ACTUALIZAR FOTO DE PERFIL
export const SolicitudActualizarFotoAgente = (data) =>
  axios.put("/agentes/ActualizarFotoAgente", data);
// SOLICITUD ACTUALIZAR AGENTE
export const SolicitudActualizarAgente = (data) =>
  axios.put("/agentes/ActualizarAgente", data);
// SOLICITUD ACTUALIZAR INFORMACIÓN
export const SolicitudActualizarInformacion = (data) =>
  axios.put("/agentes/ActualizarInformacion", data);
// SOLICITUD ACTUALIZAR CONTRASEÑA
export const SolicitudActualizarContraseña = (data) =>
  axios.put("/agentes/ActualizarContrasena", data);
