// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// HOOKS A USAR
import useContraseña from "../hooks/IniciarSesion/useContraseña";

// AYUDAS A USAR
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../helpers/Generales/ManejarRespuestasDelServidor";
import { MENSAJES_VALIDACIONES } from "../helpers/Generales/MensajesValidaciones";
import { LOGO_TRANSITO } from "../helpers/Generales/Urls";

// ESTILOS A USAR
import "../styles/Vistas/IniciarSesion.css";

export default function IniciarSesion() {
  const navigate = useNavigate();
  const { IniciarSesion } = useGlobal();
  const { iconoDeContraseña } = useContraseña();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const ManejarRespuestaExitosa = (res) => {
    toast.success(
      `¡Sesión iniciada, Bienvenido ${res.NombreAgente.toUpperCase()}!`,
      {
        theme: "colored",
      }
    );
    setTimeout(() => navigate("/Menu"), 1000);
  };

  const VerificarInicioDeSesion = handleSubmit(async (data) => {
    try {
      const res = await IniciarSesion(data);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        ManejarRespuestaExitosa(res);
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
    <main className="IniciarSesion">
      <form onSubmit={VerificarInicioDeSesion} className="IniciarSesion__Form">
        <img
          src={LOGO_TRANSITO}
          alt="Logo Transito"
          className="IniciarSesion__Form--Img"
        />
        <h2 className="IniciarSesion__Form--Title">
          ¡Por favor ingresa tus datos de acceso ✋!
        </h2>
        {/* <hr className="IniciarSesion__Form--Divisor" /> */}
        <div className="IniciarSesion__Form--ContenedorCampos">
          <span className="IniciarSesion__Form--ContenedorCampos--Icono">
            <ion-icon name="key"></ion-icon>
          </span>
          <input
            id="ClaveInternaAgente"
            name="ClaveInternaAgente"
            type="text"
            placeholder="Clave Interna"
            className="IniciarSesion__Form--ContenedorCampos--Input"
            {...register("ClaveInternaAgente", {
              required: MENSAJES_VALIDACIONES.REQUERIDO,
            })}
          />
        </div>
        {MensajeDeErrorInput("ClaveInternaAgente")}
        <div className="IniciarSesion__Form--ContenedorCampos">
          <span className="IniciarSesion__Form--ContenedorCampos--Icono">
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          {iconoDeContraseña}
          <input
            id="ContraseñaAgente"
            name="ContraseñaAgente"
            type="password"
            placeholder="Contraseña"
            className="IniciarSesion__Form--ContenedorCampos--Input"
            {...register("ContraseñaAgente", {
              required: MENSAJES_VALIDACIONES.REQUERIDO,
            })}
          />
        </div>
        {MensajeDeErrorInput("ContraseñaAgente")}
        <button type="submit" className="IniciarSesion__Form--BotonEnviar">
          Iniciar Sesión <ion-icon name="log-in"></ion-icon>
        </button>
      </form>
      <ToastContainer limit={2} transition={Zoom} draggable stacked />
    </main>
  );
}
