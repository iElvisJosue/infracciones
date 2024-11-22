/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// CONTEXTOS A USAR
import { useConceptos } from "../../context/ConceptosContext";

// COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

export default function AdministrarConceptosEditarConcepto({
  informacionDelConcepto,
  establecerVistaAdministrarConceptos,
  obtenerConceptosNuevamente,
  establecerObtenerConceptosNuevamente,
}) {
  const { ActualizarConcepto } = useConceptos();
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
    setValue("NombreConcepto", informacionDelConcepto.NombreConcepto);
    setValue("ImporteConcepto", informacionDelConcepto.ImporteConcepto);
    setValue("ActivoConcepto", informacionDelConcepto.ActivoConcepto);
  }, []);

  const PeticionParaActualizarConcepto = handleSubmit(async (data) => {
    try {
      data.CookieConToken = COOKIE_CON_TOKEN;
      data.idListaConcepto = informacionDelConcepto.idListaConcepto;
      const res = await ActualizarConcepto(data);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerConceptosNuevamente(!obtenerConceptosNuevamente);
        establecerVistaAdministrarConceptos(0);
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

  //SON LOS MISMOS ESTILOS DE REGISTRAR CONCEPTO
  return (
    <form
      className="AdministrarConceptos__Formulario"
      onSubmit={PeticionParaActualizarConcepto}
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaAdministrarConceptos}
        VistaRegresar={0}
      />
      <h1 className="AdministrarConceptos__Formulario--Titulo">
        Actualizar concepto <br /> ✍
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="help-circle"></ion-icon> Nombre del concepto
        </p>
        <input
          id="NombreConcepto"
          type="text"
          name="NombreConcepto"
          placeholder="Escribe aquí..."
          {...register("NombreConcepto", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 255,
              message: MENSAJES_VALIDACIONES.MAX255,
            },
          })}
        />
        {MensajeDeErrorInput("NombreConcepto")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="cash"></ion-icon> Importe
        </p>
        <input
          id="ImporteConcepto"
          type="number"
          name="ImporteConcepto"
          placeholder="Escribe aquí..."
          {...register("ImporteConcepto", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 255,
              message: MENSAJES_VALIDACIONES.MAX255,
            },
          })}
        />
        {MensajeDeErrorInput("ImporteConcepto")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="radio-button-on"></ion-icon> ¿Activo?
        </p>
        <select
          id="ActivoConcepto"
          name="ActivoConcepto"
          {...register("ActivoConcepto")}
        >
          <option value="Activo">Activo</option>
          <option value="Desactivado">Desactivado</option>
        </select>
      </span>
      <GrupoDeBotonesInferior BotonActualizar={true} />
    </form>
  );
}
