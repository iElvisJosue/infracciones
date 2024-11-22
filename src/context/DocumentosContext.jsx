/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarDocumento,
  SolicitudObtenerDocumentosPorFiltro,
  SolicitudActivarDesactivarDocumento,
  SolicitudActualizarDocumento,
  SolicitudObtenerDocumentosActivos,
} from "../api/authDocumentos";

export const DocumentosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDocumentos = () => {
  const context = useContext(DocumentosContext);
  if (!context) {
    throw new Error(
      "useDocumentos debería ser usado dentro de PROVEEDOR DOCUMENTOS"
    );
  }
  return context;
};
export const ProveedorDocumentos = ({ children }) => {
  const RegistrarDocumento = async (data) => {
    try {
      const res = await SolicitudRegistrarDocumento(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerDocumentosPorFiltro = async (data) => {
    try {
      const res = await SolicitudObtenerDocumentosPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActivarDesactivarDocumento = async (data) => {
    try {
      const res = await SolicitudActivarDesactivarDocumento(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarDocumento = async (data) => {
    try {
      const res = await SolicitudActualizarDocumento(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerDocumentosActivos = async (data) => {
    try {
      const res = await SolicitudObtenerDocumentosActivos(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <DocumentosContext.Provider
      value={{
        RegistrarDocumento,
        ObtenerDocumentosPorFiltro,
        ActivarDesactivarDocumento,
        ActualizarDocumento,
        ObtenerDocumentosActivos,
      }}
    >
      {children}
    </DocumentosContext.Provider>
  );
};
