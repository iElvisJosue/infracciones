/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

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
import "../../styles/Componentes/Perfil/PerfilActualizarContraseña.css";

export default function PerfilActualizarContraseña({
  agente,
  CerrandoSesion,
  establecerVistaPerfil,
}) {
  const { ActualizarContraseña } = useAgentes();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const PeticionActualizarContrasena = handleSubmit(async (data) => {
    const {
      ContrasenaActual,
      ContrasenaNuevaAgente,
      ConfirmarContrasenaAgente,
    } = data;

    if (ContrasenaNuevaAgente !== ConfirmarContrasenaAgente) {
      return toast.warning(
        "¡Oops! Parece que las contraseñas no son iguales, por favor vuelve a intentarlo",
        {
          theme: "colored",
        }
      );
    }
    try {
      const res = await ActualizarContraseña({
        CookieConToken: COOKIE_CON_TOKEN,
        idAgente: agente.idAgente,
        ContrasenaActual,
        ContrasenaNuevaAgente,
      });
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        CerrandoSesion();
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
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
      className="PerfilActualizarContraseña"
      onSubmit={PeticionActualizarContrasena}
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaPerfil}
        VistaRegresar={0}
      />
      <TituloSeccion emoji="🔐">Actualizar Contraseña</TituloSeccion>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="time"></ion-icon> Contraseña Actual
        </p>
        <input
          id="ContrasenaActual"
          type="password"
          name="ContrasenaActual"
          placeholder="Escribe aquí..."
          {...register("ContrasenaActual", {
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
        {MensajeDeErrorInput("ContrasenaActual")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="lock-closed"></ion-icon> Contraseña Nueva
        </p>
        <input
          id="ContrasenaNuevaAgente"
          type="password"
          name="ContrasenaNuevaAgente"
          placeholder="Escribe aquí..."
          {...register("ContrasenaNuevaAgente", {
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
        {MensajeDeErrorInput("ContrasenaNuevaAgente")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="checkmark-circle"></ion-icon> Confirmar Contraseña
        </p>
        <input
          id="ConfirmarContrasenaAgente"
          type="password"
          name="ConfirmarContrasenaAgente"
          placeholder="Escribe aquí..."
          {...register("ConfirmarContrasenaAgente", {
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
        {MensajeDeErrorInput("ConfirmarContrasenaAgente")}
      </span>
      <small className="PerfilActualizarContraseña__MensajeEncriptado">
        📣
        <br />
        ¡ATENCIÓN!
        <br />
        Después de confirmar el cambio de contraseña, tu sesión finalizará.
      </small>
      <GrupoDeBotonesInferior BotonActualizar={true} />
    </form>
  );
}
