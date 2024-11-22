/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// CONTEXTOS A USAR
import { useDocumentos } from "../../context/DocumentosContext";

// COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

export default function AdministrarDocumentosEditarDocumento({
  informacionDelDocumento,
  establecerVistaAdministrarDocumentos,
  obtenerDocumentosNuevamente,
  establecerObtenerDocumentosNuevamente,
}) {
  const { ActualizarDocumento } = useDocumentos();
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
    setValue("NombreDocumento", informacionDelDocumento.NombreDocumento);
    setValue("ActivoDocumento", informacionDelDocumento.ActivoDocumento);
  }, []);

  const PeticionParaActualizarDocumento = handleSubmit(async (data) => {
    try {
      data.CookieConToken = COOKIE_CON_TOKEN;
      data.idListaDocumento = informacionDelDocumento.idListaDocumento;
      const res = await ActualizarDocumento(data);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerDocumentosNuevamente(!obtenerDocumentosNuevamente);
        establecerVistaAdministrarDocumentos(0);
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

  //SON LOS MISMOS ESTILOS DE REGISTRAR DOCUMENTO
  return (
    <form
      className="AdministrarDocumentos__Formulario"
      onSubmit={PeticionParaActualizarDocumento}
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaAdministrarDocumentos}
        VistaRegresar={0}
      />
      <h1 className="AdministrarDocumentos__Formulario--Titulo">
        Actualizar documento <br /> ✍
      </h1>
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
      <GrupoDeBotonesInferior BotonActualizar={true} />
    </form>
  );
}
