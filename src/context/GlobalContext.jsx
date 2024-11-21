import { createContext, useState, useContext, useEffect } from "react";
import {
  SolicitudIniciarSesion,
  SolicitudVerificarToken,
  SolicitudCerrarSesion,
} from "../api/authGlobal";
import Cookies from "js-cookie";

export const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debería ser usado dentro de Proveedor global");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ProveedorGlobal = ({ children }) => {
  const [agente, establecerAgente] = useState(null);
  const [tieneCookie, establecerTieneCookie] = useState(false);
  const [cargando, establecerCargando] = useState(true);

  const setError = () => {
    establecerAgente(null);
    establecerTieneCookie(false);
    establecerCargando(false);
  };

  const setSuccess = (res) => {
    establecerAgente(res);
    establecerCargando(false);
    establecerTieneCookie(true);
    return res;
  };

  // COMPROBAR SI TIENE UN COOKIE
  useEffect(() => {
    async function ValidarCookie() {
      const cookies = Cookies.get();
      if (!cookies.TOKEN_ACCESO_INFRACCIONES) {
        console.log("NO HAY COOKIE :(");
        return setError();
      }
      try {
        const res = await SolicitudVerificarToken({
          cookie: cookies.TOKEN_ACCESO_INFRACCIONES,
        });
        if (!res.data) {
          setError();
          return;
        } else {
          setSuccess(res.data);
          return;
        }
      } catch (error) {
        console.log(error);
        setError();
        return;
      }
    }
    ValidarCookie();
  }, []);

  const IniciarSesion = async (data) => {
    try {
      const res = await SolicitudIniciarSesion(data);
      if (!res.data) {
        return setError();
      }
      Cookies.set(
        "TOKEN_ACCESO_INFRACCIONES",
        res.data.TOKEN_ACCESO_INFRACCIONES,
        {
          expires: 1,
        }
      );
      return setSuccess(res.data);
    } catch (error) {
      setError();
      return error;
    }
  };

  const CerrarSesion = async () => {
    await SolicitudCerrarSesion();
    return setError();
  };

  return (
    <GlobalContext.Provider
      value={{
        agente,
        cargando,
        tieneCookie,
        IniciarSesion,
        CerrarSesion,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
