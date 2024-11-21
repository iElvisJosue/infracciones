/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarPersona,
  SolicitudObtenerPersonasPorFiltro,
  SolicitudActivarDesactivarPersona,
  SolicitudActualizarPersona,
  SolicitudObtenerPersonasActivasPorFiltro,
} from "../api/authPersonas";

export const PersonasContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePersonas = () => {
  const context = useContext(PersonasContext);
  if (!context) {
    throw new Error(
      "usePersonas debería ser usado dentro de PROVEEDOR PERSONAS"
    );
  }
  return context;
};
export const ProveedorPersonas = ({ children }) => {
  const RegistrarPersona = async (data) => {
    try {
      const res = await SolicitudRegistrarPersona(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerPersonasPorFiltro = async (data) => {
    try {
      const res = await SolicitudObtenerPersonasPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActivarDesactivarPersona = async (data) => {
    try {
      const res = await SolicitudActivarDesactivarPersona(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarPersona = async (data) => {
    try {
      const res = await SolicitudActualizarPersona(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerPersonasActivasPorFiltro = async (data) => {
    try {
      const res = await SolicitudObtenerPersonasActivasPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <PersonasContext.Provider
      value={{
        RegistrarPersona,
        ObtenerPersonasPorFiltro,
        ActivarDesactivarPersona,
        ActualizarPersona,
        ObtenerPersonasActivasPorFiltro,
      }}
    >
      {children}
    </PersonasContext.Provider>
  );
};
