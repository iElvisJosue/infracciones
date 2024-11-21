/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// CONTEXTOS A USAR
import { useGruas } from "../../context/GruasContext";

// COMPONENTES A USAR
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

export default function AdministrarGruasFormulario({
  obtenerGruasNuevamente,
  establecerObtenerGruasNuevamente,
}) {
  const { RegistrarGrua } = useGruas();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const PeticionParaRegistrarGrua = handleSubmit(async (data) => {
    try {
      data.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarGrua(data);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerGruasNuevamente(!obtenerGruasNuevamente);
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
      className="AdministrarGruas__Formulario"
      onSubmit={PeticionParaRegistrarGrua}
    >
      <h1 className="AdministrarGruas__Formulario--Titulo">
        Registrar nueva grúa <br /> 👩‍💻
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="hammer"></ion-icon> Nombre de la grúa
        </p>
        <input
          id="NombreGrua"
          type="text"
          name="NombreGrua"
          placeholder="Escribe aquí..."
          {...register("NombreGrua", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 255,
              message: MENSAJES_VALIDACIONES.MAX255,
            },
          })}
        />
        {MensajeDeErrorInput("NombreGrua")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="radio-button-on"></ion-icon> ¿Activa?
        </p>
        <select id="ActivaGrua" name="ActivaGrua" {...register("ActivaGrua")}>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>
      </span>
      <GrupoDeBotonesInferior BotonRegistrar={true} />
    </form>
  );
}
