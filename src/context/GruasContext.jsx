/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarGrua,
  SolicitudObtenerGruasPorFiltro,
  SolicitudActivarDesactivarGrua,
  SolicitudActualizarGrua,
  SolicitudObtenerGruasActivasPorFiltro,
} from "../api/authGruas";

export const GruasContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGruas = () => {
  const context = useContext(GruasContext);
  if (!context) {
    throw new Error("useGruas debería ser usado dentro de PROVEEDOR GRUAS");
  }
  return context;
};
export const ProveedorGruas = ({ children }) => {
  const RegistrarGrua = async (data) => {
    try {
      const res = await SolicitudRegistrarGrua(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerGruasPorFiltro = async (data) => {
    try {
      const res = await SolicitudObtenerGruasPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActivarDesactivarGrua = async (data) => {
    try {
      const res = await SolicitudActivarDesactivarGrua(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarGrua = async (data) => {
    try {
      const res = await SolicitudActualizarGrua(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerGruasActivasPorFiltro = async (data) => {
    try {
      const res = await SolicitudObtenerGruasActivasPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <GruasContext.Provider
      value={{
        RegistrarGrua,
        ObtenerGruasPorFiltro,
        ActivarDesactivarGrua,
        ActualizarGrua,
        ObtenerGruasActivasPorFiltro,
      }}
    >
      {children}
    </GruasContext.Provider>
  );
};
