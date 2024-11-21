import axios from "./axios";

// SOLICITUD PARA REGISTRAR UNA INFRACCION
export const SolicitudRegistrarInfraccion = (data) =>
  axios.post("/infracciones/RegistrarInfraccion", data);
// SOLICITUD PARA GUARDAR IMAGEN DE EVIDENCIA
export const SolicitudGuardarImagenDeEvidencia = (data) =>
  axios.post("/infracciones/GuardarImagenDeEvidencia", data);
// SOLICITUD BUSCAR INFRACCIONES POR FILTRO
export const SolicitudBuscarInfraccionesPorFiltro = (data) =>
  axios.post("/infracciones/BuscarInfraccionesPorFiltro", data);
// SOLICITUD BUSCAR INFRACCIONES POR FECHA
export const SolicitudBuscarInfraccionesPorFecha = (data) =>
  axios.post("/infracciones/BuscarInfraccionesPorFecha", data);
// SOLICITUD BUSCAR CONCEPTOS DOCUMENTOS EVIDENCIAS
export const SolicitudBuscarConceptosDocumentosEvidencias = ({
  CookieConToken,
  idInfraccion,
}) =>
  axios.get(
    `/infracciones/BuscarConceptosDocumentosEvidencias/${CookieConToken}/${idInfraccion}`
  );
// SOLICITUD BUSCAR INFRACCIONES POR AGENTE Y FILTRO
export const SolicitudBuscarInfraccionesPorAgenteYFiltro = (data) =>
  axios.post("/infracciones/BuscarInfraccionesPorAgenteYFiltro", data);

// SOLICITUD BUSCAR INFRACCIONES POR AGENTE Y FECHA
export const SolicitudBuscarInfraccionesPorAgenteYFecha = (data) =>
  axios.post("/infracciones/BuscarInfraccionesPorAgenteYFecha", data);
