/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// CONTEXTOS A USAR
import { useGruas } from "../../context/GruasContext";

// COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// LOS ESTILOS ESTÁN EN AdministrarGruasFormulario.css
export default function AdministrarGruasEditarGrua({
  informacionDeLaGrua,
  establecerVistaAdministrarGruas,
  obtenerGruasNuevamente,
  establecerObtenerGruasNuevamente,
}) {
  const { ActualizarGrua } = useGruas();
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
    setValue("NombreGrua", informacionDeLaGrua.NombreGrua);
    setValue("ActivaGrua", informacionDeLaGrua.ActivaGrua);
  }, []);

  const PeticionParaActualizarGrua = handleSubmit(async (data) => {
    try {
      data.CookieConToken = COOKIE_CON_TOKEN;
      data.idGrua = informacionDeLaGrua.idGrua;
      const res = await ActualizarGrua(data);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerGruasNuevamente(!obtenerGruasNuevamente);
        establecerVistaAdministrarGruas(0);
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

  //SON LOS MISMOS ESTILOS DE REGISTRAR GRÚA
  return (
    <form
      className="AdministrarGruas__Formulario"
      onSubmit={PeticionParaActualizarGrua}
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaAdministrarGruas}
        VistaRegresar={0}
      />
      <h1 className="AdministrarGruas__Formulario--Titulo">
        Actualizar grúa <br /> ✍
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
      <GrupoDeBotonesInferior BotonActualizar={true} />
    </form>
  );
}
