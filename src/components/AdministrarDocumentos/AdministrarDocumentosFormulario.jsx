/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// CONTEXTOS A USAR
import { useDocumentos } from "../../context/DocumentosContext";

// COMPONENTES A USAR
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";
import TituloSeccion from "../Globales/TituloSeccion";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// ESTILOS A USAR
import "../../styles/Componentes/AdministrarDocumentos/AdministrarDocumentosFormulario.css";

export default function AdministrarDocumentosFormulario({
  obtenerDocumentosNuevamente,
  establecerObtenerDocumentosNuevamente,
}) {
  const { RegistrarDocumento } = useDocumentos();
  const [mostrarFormulario, establecerMostrarFormulario] = useState(true);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const PeticionParaRegistrarDocumento = handleSubmit(async (data) => {
    try {
      data.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarDocumento(data);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerDocumentosNuevamente(!obtenerDocumentosNuevamente);
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
    ? "AdministrarDocumentos__Formulario"
    : "AdministrarDocumentos__Formulario Ocultar";

  return (
    <form className={claseFormulario} onSubmit={PeticionParaRegistrarDocumento}>
      <TituloSeccion
        mostrarBoton={true}
        mostrarContenido={mostrarFormulario}
        establecerMostrarContenido={establecerMostrarFormulario}
      >
        Registrar Documento
      </TituloSeccion>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="document-text"></ion-icon> Nombre del documento
        </p>
        <input
          id="NombreDocumento"
          type="text"
          name="NombreDocumento"
          placeholder="Escribe aquí..."
          {...register("NombreDocumento", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 255,
              message: MENSAJES_VALIDACIONES.MAX255,
            },
          })}
        />
        {MensajeDeErrorInput("NombreDocumento")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="radio-button-on"></ion-icon> ¿Activo?
        </p>
        <select
          id="ActivoDocumento"
          name="ActivoDocumento"
          {...register("ActivoDocumento")}
        >
          <option value="Activo">Activo</option>
          <option value="Desactivado">Desactivado</option>
        </select>
      </span>
      <GrupoDeBotonesInferior BotonRegistrar={true} />
    </form>
  );
}
