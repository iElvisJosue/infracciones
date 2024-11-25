/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// CONTEXTOS A USAR
import { useConceptos } from "../../context/ConceptosContext";

// COMPONENTES A USAR
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";
import TituloSeccion from "../Globales/TituloSeccion";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// ESTILOS A USAR
import "../../styles/Componentes/AdministrarConceptos/AdministrarConceptosFormulario.css";

export default function AdministrarConceptosFormulario({
  obtenerConceptosNuevamente,
  establecerObtenerConceptosNuevamente,
}) {
  const { RegistrarConcepto } = useConceptos();
  const [mostrarFormulario, establecerMostrarFormulario] = useState(true);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const PeticionParaRegistrarConcepto = handleSubmit(async (data) => {
    try {
      data.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarConcepto(data);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerConceptosNuevamente(!obtenerConceptosNuevamente);
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

  const claseFormulario = mostrarFormulario
    ? "AdministrarConceptos__Formulario"
    : "AdministrarConceptos__Formulario Ocultar";

  return (
    <form className={claseFormulario} onSubmit={PeticionParaRegistrarConcepto}>
      <TituloSeccion
        mostrarBoton={true}
        mostrarContenido={mostrarFormulario}
        establecerMostrarContenido={establecerMostrarFormulario}
      >
        Registrar Concepto
      </TituloSeccion>
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
      <GrupoDeBotonesInferior BotonRegistrar={true} />
    </form>
  );
}
