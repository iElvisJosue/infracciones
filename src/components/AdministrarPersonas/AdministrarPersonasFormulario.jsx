/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// CONTEXTOS A USAR
import { usePersonas } from "../../context/PersonasContext";

// COMPONENTES A USAR
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// ESTILOS A USAR
import "../../styles/Componentes/AdministrarPersonas/AdministrarPersonasFormulario.css";

export default function AdministrarPersonasFormulario({
  obtenerPersonasNuevamente,
  establecerObtenerPersonasNuevamente,
}) {
  const { RegistrarPersona } = usePersonas();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const PeticionParaRegistrarPersona = handleSubmit(async (data) => {
    try {
      data.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarPersona(data);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerObtenerPersonasNuevamente(!obtenerPersonasNuevamente);
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
      className="AdministrarPersonas__Formulario"
      onSubmit={PeticionParaRegistrarPersona}
    >
      <h1 className="AdministrarPersonas__Formulario--Titulo">
        Registrar nueva persona <br /> 👩‍💻
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="person-circle"></ion-icon> Tipo persona
        </p>
        <select
          id="TipoPersona"
          name="TipoPersona"
          {...register("TipoPersona")}
        >
          <option value="Física">Física</option>
          <option value="Moral">Moral</option>
        </select>
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="person"></ion-icon> Nombre
        </p>
        <input
          id="NombrePersona"
          type="text"
          name="NombrePersona"
          placeholder="Escribe aquí..."
          {...register("NombrePersona", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 50,
              message: MENSAJES_VALIDACIONES.MAX50,
            },
          })}
        />
        {MensajeDeErrorInput("NombrePersona")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="man"></ion-icon> Apellido Paterno
        </p>
        <input
          id="ApellidoPaternoPersona"
          type="text"
          name="ApellidoPaternoPersona"
          placeholder="Escribe aquí..."
          {...register("ApellidoPaternoPersona", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 50,
              message: MENSAJES_VALIDACIONES.MAX50,
            },
          })}
        />
        {MensajeDeErrorInput("ApellidoPaternoPersona")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="woman"></ion-icon> Apellido Materno
        </p>
        <input
          id="ApellidoMaternoPersona"
          type="text"
          name="ApellidoMaternoPersona"
          placeholder="Escribe aquí..."
          {...register("ApellidoMaternoPersona", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 50,
              message: MENSAJES_VALIDACIONES.MAX50,
            },
          })}
        />
        {MensajeDeErrorInput("ApellidoMaternoPersona")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="id-card"></ion-icon>RFC
        </p>
        <input
          id="RFCPersona"
          type="text"
          name="RFCPersona"
          placeholder="RFC41234567L0"
          style={{ textTransform: "uppercase" }}
          {...register("RFCPersona", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 15,
              message: MENSAJES_VALIDACIONES.MAX15,
            },
          })}
        />
        {MensajeDeErrorInput("RFCPersona")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="id-card"></ion-icon>CURP
        </p>
        <input
          id="CURPPersona"
          type="text"
          name="CURPPersona"
          placeholder="CURP850610HDFLRN02"
          style={{ textTransform: "uppercase" }}
          {...register("CURPPersona", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 20,
              message: MENSAJES_VALIDACIONES.MAX20,
            },
          })}
        />
        {MensajeDeErrorInput("CURPPersona")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="male-female"></ion-icon>Genero
        </p>
        <select
          id="GeneroPersona"
          name="GeneroPersona"
          {...register("GeneroPersona")}
        >
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </span>
      <span className="GrupoDeInputs Dos">
        <p>
          <ion-icon name="location"></ion-icon>Dirección
        </p>
        <input
          id="DireccionPersona"
          type="text"
          name="DireccionPersona"
          placeholder="Escribe aquí..."
          {...register("DireccionPersona", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 1000,
              message: MENSAJES_VALIDACIONES.MAX1000,
            },
          })}
        />
        {MensajeDeErrorInput("DireccionPersona")}
      </span>
      <GrupoDeBotonesInferior BotonRegistrar={true} />
    </form>
  );
}
