/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// CONTEXTOS A USAR
import { useAgentes } from "../../context/AgentesContext";

// COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { toast } from "react-toastify";

export default function AdministrarAgentesEditarAgente({
  informacionDelAgente,
  establecerVistaAdministrarAgentes,
  obtenerAgentesNuevamente,
  establecerObtenerAgentesNuevamente,
}) {
  const { ActualizarAgente } = useAgentes();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("ClaveInternaAgente", informacionDelAgente.ClaveInternaAgente);
    setValue("ContraseñaAgente", informacionDelAgente.ContraseñaAgente);
    setValue(
      "ConfirmarContraseñaAgente",
      informacionDelAgente.ContraseñaAgente
    );
    setValue("NombreAgente", informacionDelAgente.NombreAgente);
    setValue("ApellidosAgente", informacionDelAgente.ApellidosAgente);
    setValue("TipoPerfilAgente", informacionDelAgente.TipoPerfilAgente);
  }, []);

  const PeticionParaActualizarAgente = handleSubmit(async (data) => {
    if (data.ContraseñaAgente !== data.ConfirmarContraseñaAgente) {
      return toast.warning(
        "¡Oops! Parece que las contraseñas no son iguales, por favor vuelve a intentarlo",
        {
          theme: "colored",
        }
      );
    }
    try {
      data.CookieConToken = COOKIE_CON_TOKEN;
      data.idAgente = informacionDelAgente.idAgente;
      const res = await ActualizarAgente(data);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerAgentesNuevamente(!obtenerAgentesNuevamente);
        establecerVistaAdministrarAgentes(0);
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  });
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
      className="AdministrarAgentes__Formulario"
      onSubmit={PeticionParaActualizarAgente}
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaAdministrarAgentes}
        VistaRegresar={0}
      />
      <h1 className="AdministrarAgentes__Formulario--Titulo">
        Actualizar agente <br /> ✍
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="key"></ion-icon> Clave Interna
        </p>
        <input
          id="ClaveInternaAgente"
          type="text"
          name="ClaveInternaAgente"
          placeholder="Escribe aquí..."
          {...register("ClaveInternaAgente", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 10,
              message: MENSAJES_VALIDACIONES.MAX10,
            },
          })}
        />
        {MensajeDeErrorInput("ClaveInternaAgente")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="lock-closed"></ion-icon> Contraseña
        </p>
        <input
          id="ContraseñaAgente"
          type="password"
          name="ContraseñaAgente"
          placeholder="Escribe aquí..."
          {...register("ContraseñaAgente", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 100,
              message: MENSAJES_VALIDACIONES.MAX100,
            },
            minLength: {
              value: 4,
              message: MENSAJES_VALIDACIONES.MIN4,
            },
          })}
        />
        {MensajeDeErrorInput("ContraseñaAgente")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="checkmark-circle"></ion-icon> Confirmar Contraseña
        </p>
        <input
          id="ConfirmarContraseñaAgente"
          type="password"
          name="ConfirmarContraseñaAgente"
          placeholder="Escribe aquí..."
          {...register("ConfirmarContraseñaAgente", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 100,
              message: MENSAJES_VALIDACIONES.MAX100,
            },
            minLength: {
              value: 4,
              message: MENSAJES_VALIDACIONES.MIN4,
            },
          })}
        />
        {MensajeDeErrorInput("ConfirmarContraseñaAgente")}
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
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="shield-half"></ion-icon> Tipo de perfil
        </p>
        <select
          id="TipoPerfilAgente"
          name="TipoPerfilAgente"
          {...register("TipoPerfilAgente")}
        >
          <option value="Agente">Agente</option>
          <option value="Administrador">Administrador</option>
        </select>
      </span>
      <GrupoDeBotonesInferior BotonActualizar={true} />
    </form>
  );
}
