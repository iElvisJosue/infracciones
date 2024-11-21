/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarInfraccion,
  SolicitudGuardarImagenDeEvidencia,
  SolicitudBuscarInfraccionesPorFiltro,
  SolicitudBuscarInfraccionesPorFecha,
  SolicitudBuscarConceptosDocumentosEvidencias,
  SolicitudBuscarInfraccionesPorAgenteYFiltro,
  SolicitudBuscarInfraccionesPorAgenteYFecha,
} from "../api/authInfracciones";

export const InfraccionesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useInfracciones = () => {
  const context = useContext(InfraccionesContext);
  if (!context) {
    throw new Error(
      "useInfracciones debería ser usado dentro de PROVEEDOR INFRACCIONES"
    );
  }
  return context;
};
export const ProveedorInfracciones = ({ children }) => {
  const RegistrarInfraccion = async (data) => {
    try {
      const res = await SolicitudRegistrarInfraccion(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const GuardarImagenDeEvidencia = async (data) => {
    try {
      const res = await SolicitudGuardarImagenDeEvidencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarInfraccionesPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarInfraccionesPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarInfraccionesPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarInfraccionesPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarConceptosDocumentosEvidencias = async (data) => {
    try {
      const res = await SolicitudBuscarConceptosDocumentosEvidencias(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarInfraccionesPorAgenteYFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarInfraccionesPorAgenteYFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarInfraccionesPorAgenteYFecha = async (data) => {
    try {
      const res = await SolicitudBuscarInfraccionesPorAgenteYFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <InfraccionesContext.Provider
      value={{
        RegistrarInfraccion,
        GuardarImagenDeEvidencia,
        BuscarInfraccionesPorFiltro,
        BuscarInfraccionesPorFecha,
        BuscarConceptosDocumentosEvidencias,
        BuscarInfraccionesPorAgenteYFiltro,
        BuscarInfraccionesPorAgenteYFecha,
      }}
    >
      {children}
    </InfraccionesContext.Provider>
  );
};
