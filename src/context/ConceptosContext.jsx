/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { SolicitudObtenerConceptosActivos } from "../api/authConceptos";

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
        ObtenerConceptosActivos,
      }}
    >
      {children}
    </ConceptosContext.Provider>
  );
};
