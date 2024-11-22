/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarConcepto,
  SolicitudObtenerConceptosPorFiltro,
  SolicitudActivarDesactivarConcepto,
  SolicitudActualizarConcepto,
  SolicitudObtenerConceptosActivos,
} from "../api/authConceptos";

export const ConceptosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useConceptos = () => {
  const context = useContext(ConceptosContext);
  if (!context) {
    throw new Error(
      "useConceptos debería ser usado dentro de PROVEEDOR CONCEPTOS"
    );
  }
  return context;
};
export const ProveedorConceptos = ({ children }) => {
  const RegistrarConcepto = async (data) => {
    try {
      const res = await SolicitudRegistrarConcepto(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerConceptosPorFiltro = async (data) => {
    try {
      const res = await SolicitudObtenerConceptosPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActivarDesactivarConcepto = async (data) => {
    try {
      const res = await SolicitudActivarDesactivarConcepto(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarConcepto = async (data) => {
    try {
      const res = await SolicitudActualizarConcepto(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerConceptosActivos = async (data) => {
    try {
      const res = await SolicitudObtenerConceptosActivos(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ConceptosContext.Provider
      value={{
        RegistrarConcepto,
        ObtenerConceptosPorFiltro,
        ActivarDesactivarConcepto,
        ActualizarConcepto,
        ObtenerConceptosActivos,
      }}
    >
      {children}
    </ConceptosContext.Provider>
  );
};
