import axios from "./axios";

// SOLICITUD PARA INICIAR SESIÓN
export const SolicitudIniciarSesion = (data) =>
  axios.post("/global/IniciarSesion", data);
// SOLICITUD PARA CERRAR SESIÓN
export const SolicitudCerrarSesion = (data) =>
  axios.post("/global/CerrarSesion", data);
// SOLICITUD PARA VERIFICAR TOKEN DEL NAVEGADOR
export const SolicitudVerificarToken = (data) =>
  axios.post("/global/VerificarToken", data);
