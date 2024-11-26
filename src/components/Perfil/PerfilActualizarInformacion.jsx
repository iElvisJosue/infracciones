/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS
import { useAgentes } from "../../context/AgentesContext";

// IMPORTAMOS LOS COMPONENTES
import TituloSeccion from "../../components/Globales/TituloSeccion";
import GrupoDeBotonesSuperior from "../../components/Globales/GrupoDeBotonesSuperior";
import GrupoDeBotonesInferior from "../../components/Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/Perfil/PerfilActualizarInformacion.css";

export default function PerfilActualizarInformacion({
  agente,
  ObtenerInformacionAgente,
  establecerVistaPerfil,
}) {
  const { ActualizarInformacion } = useAgentes();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("ClaveInternaAgente", agente.ClaveInternaAgente);
    setValue("NombreAgente", agente.NombreAgente);
    setValue("ApellidosAgente", agente.ApellidosAgente);
  }, []);

  const PerfilActualizarInformacion = handleSubmit(async (data) => {
    try {
      const res = await ActualizarInformacion({
        CookieConToken: COOKIE_CON_TOKEN,
        idAgente: agente.idAgente,
        ClaveInternaAgente: data.ClaveInternaAgente,
        NombreAgente: data.NombreAgente,
        ApellidosAgente: data.ApellidosAgente,
      });
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        SolicitudObtenerInformacionAgente();
      }
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  });

  const SolicitudObtenerInformacionAgente = async () => {
    try {
      await ObtenerInformacionAgente({
        CookieConToken: COOKIE_CON_TOKEN,
        idAgente: agente.idAgente,
      });
      establecerVistaPerfil(0);
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  };

  const MensajeDeErrorInput = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="MensajeDeErrorInput">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="PerfilActualizarInformacion"
      onSubmit={PerfilActualizarInformacion}
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaPerfil}
        VistaRegresar={0}
      />
      <TituloSeccion emoji="👥">Actualizar Información Personal</TituloSeccion>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="key"></ion-icon> Clave Interna Agente
        </p>
        <input
          id="ClaveInternaAgente"
          type="text"
          name="ClaveInternaAgente"
          placeholder="Escribe aquí..."
          {...register("ClaveInternaAgente", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 50,
              message: MENSAJES_VALIDACIONES.MAX50,
            },
          })}
        />
        {MensajeDeErrorInput("ClaveInternaAgente")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="person"></ion-icon> Nombre del agente
        </p>
        <input
          id="NombreAgente"
          type="text"
          name="NombreAgente"
          placeholder="Escribe aquí..."
          {...register("NombreAgente", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 50,
              message: MENSAJES_VALIDACIONES.MAX50,
            },
          })}
        />
        {MensajeDeErrorInput("NombreAgente")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="person"></ion-icon> Apellidos del agente
        </p>
        <input
          id="ApellidosAgente"
          type="text"
          name="ApellidosAgente"
          placeholder="Escribe aquí..."
          {...register("ApellidosAgente", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 50,
              message: MENSAJES_VALIDACIONES.MAX50,
            },
          })}
        />
        {MensajeDeErrorInput("ApellidosAgente")}
      </span>
      <small className="PerfilActualizarInformacion__MensajeEncriptado">
        📣
        <br />
        ¡ATENCIÓN!
        <br />
        Tu información personal es muy sensible, por favor actualiza tus datos
        con cuidado.
      </small>
      <GrupoDeBotonesInferior BotonActualizar={true} />
    </form>
  );
}
