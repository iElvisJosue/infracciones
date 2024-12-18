/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarAgente,
  SolicitudObtenerAgentesPorFiltro,
  SolicitudActivarDesactivarAgente,
  SolicitudActualizarAgente,
  SolicitudActualizarFotoAgente,
  SolicitudActualizarInformacion,
  SolicitudActualizarContraseña,
} from "../api/authAgentes";

export const AgentesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAgentes = () => {
  const context = useContext(AgentesContext);
  if (!context) {
    throw new Error("useAgentes debería ser usado dentro de PROVEEDOR AGENTES");
  }
  return context;
};
export const ProveedorAgentes = ({ children }) => {
  const RegistrarAgente = async (data) => {
    try {
      const res = await SolicitudRegistrarAgente(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerAgentesPorFiltro = async (data) => {
    try {
      const res = await SolicitudObtenerAgentesPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActivarDesactivarAgente = async (data) => {
    try {
      const res = await SolicitudActivarDesactivarAgente(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarAgente = async (data) => {
    try {
      const res = await SolicitudActualizarAgente(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const ActualizarFotoAgente = async (data) => {
    try {
      const res = await SolicitudActualizarFotoAgente(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const ActualizarInformacion = async (data) => {
    try {
      const res = await SolicitudActualizarInformacion(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarContraseña = async (data) => {
    try {
      const res = await SolicitudActualizarContraseña(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <AgentesContext.Provider
      value={{
        RegistrarAgente,
        ObtenerAgentesPorFiltro,
        ActivarDesactivarAgente,
        ActualizarAgente,
        ActualizarFotoAgente,
        ActualizarInformacion,
        ActualizarContraseña,
      }}
    >
      {children}
    </AgentesContext.Provider>
  );
};
