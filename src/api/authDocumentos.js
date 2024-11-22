import axios from "./axios";

// SOLICITUD PARA REGISTRAR UN DOCUMENTO
export const SolicitudRegistrarDocumento = (data) =>
  axios.post("/documentos/RegistrarDocumento", data);
// SOLICITUD OBTENER DOCUMENTOS POR FILTRO
export const SolicitudObtenerDocumentosPorFiltro = (data) =>
  axios.post("/documentos/ObtenerDocumentosPorFiltro", data);
// SOLICITUD DESACTIVAR/ACTIVAR DOCUMENTO
export const SolicitudActivarDesactivarDocumento = (data) =>
  axios.post("/documentos/ActivarDesactivarDocumento", data);
// SOLICITUD ACTUALIZAR DOCUMENTO
export const SolicitudActualizarDocumento = (data) =>
  axios.put("/documentos/ActualizarDocumento", data);
// SOLICITUD PARA OBTENER LOS DOCUMENTOS ACTIVOS
export const SolicitudObtenerDocumentosActivos = ({ CookieConToken }) =>
  axios.get(`/documentos/ObtenerDocumentosActivos/${CookieConToken}`);
