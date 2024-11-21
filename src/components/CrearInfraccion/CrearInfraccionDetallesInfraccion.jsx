/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";

export default function CrearInfraccionDetallesInfraccion({
  establecerInformacionDeLaInfraccion,
  establecerVistaCrearInfraccion,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const ManejarDetallesDeLaInfraccion = handleSubmit(async (data) => {
    establecerInformacionDeLaInfraccion(data);
    establecerVistaCrearInfraccion(2);
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
      className="CrearInfraccionDetallesInfraccion"
      onSubmit={ManejarDetallesDeLaInfraccion}
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaCrearInfraccion}
        VistaRegresar={0}
      />
      <h1 className="CrearInfraccionDetallesInfraccion--Titulo">
        Paso 2/6 <br />
        Detalles de la infracción <br /> 🕵️‍♂️
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="car"></ion-icon> Placas<b>*</b>
        </p>
        <input
          id="PlacasInfraccion"
          type="text"
          name="PlacasInfraccion"
          placeholder="Escribe aquí..."
          {...register("PlacasInfraccion", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 20,
              message: MENSAJES_VALIDACIONES.MAX20,
            },
          })}
        />
        {MensajeDeErrorInput("PlacasInfraccion")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="location"></ion-icon> Estado de origen<b>*</b>
        </p>
        <input
          id="EstadoOrigenInfraccion"
          type="text"
          name="EstadoOrigenInfraccion"
          placeholder="Escribe aquí..."
          {...register("EstadoOrigenInfraccion", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 50,
              message: MENSAJES_VALIDACIONES.MAX50,
            },
          })}
        />
        {MensajeDeErrorInput("EstadoOrigenInfraccion")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="location"></ion-icon> Estado<b>*</b>
        </p>
        <input
          id="EstadoInfraccion"
          type="text"
          name="EstadoInfraccion"
          placeholder="Escribe aquí..."
          {...register("EstadoInfraccion", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 50,
              message: MENSAJES_VALIDACIONES.MAX50,
            },
          })}
        />
        {MensajeDeErrorInput("EstadoInfraccion")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="locate"></ion-icon> Municipio<b>*</b>
        </p>
        <input
          id="MunicipioInfraccion"
          type="text"
          name="MunicipioInfraccion"
          placeholder="Escribe aquí..."
          {...register("MunicipioInfraccion", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 50,
              message: MENSAJES_VALIDACIONES.MAX50,
            },
          })}
        />
        {MensajeDeErrorInput("MunicipioInfraccion")}
      </span>
      <span className="GrupoDeInputs Dos">
        <p>
          <ion-icon name="pin"></ion-icon> Lugar<b>*</b>
        </p>
        <input
          id="LugarInfraccion"
          type="text"
          name="LugarInfraccion"
          placeholder="Escribe aquí..."
          {...register("LugarInfraccion", {
            required: MENSAJES_VALIDACIONES.REQUERIDO,
            maxLength: {
              value: 100,
              message: MENSAJES_VALIDACIONES.MAX100,
            },
          })}
        />
        {MensajeDeErrorInput("LugarInfraccion")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="help-circle"></ion-icon> Por Hechos<b>*</b>
        </p>
        <select
          id="PorHechosInfraccion"
          name="PorHechosInfraccion"
          {...register("PorHechosInfraccion")}
        >
          <option value="No">No</option>
          <option value="Si">Si</option>
        </select>
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="apps"></ion-icon> Clasificador<b>*</b>
        </p>
        <select
          id="ClasificadorInfraccion"
          name="ClasificadorInfraccion"
          {...register("ClasificadorInfraccion")}
        >
          <option value="Clasificador #1">Clasificador #1</option>
          <option value="Clasificador #2">Clasificador #2</option>
        </select>
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="speedometer"></ion-icon> Maneja operativo<b>*</b>
        </p>
        <select
          id="ManejaOperativoInfraccion"
          name="ManejaOperativoInfraccion"
          {...register("ManejaOperativoInfraccion")}
        >
          <option value="No">No</option>
          <option value="Si">Si</option>
        </select>
      </span>
      <span className="GrupoDeInputs Completo">
        <p>
          <ion-icon name="search"></ion-icon> Observaciones
        </p>
        <input
          id="ObservacionesInfraccion"
          type="text"
          name="ObservacionesInfraccion"
          placeholder="Escribe aquí..."
          {...register("ObservacionesInfraccion", {
            maxLength: {
              value: 1000,
              message: MENSAJES_VALIDACIONES.MAX1000,
            },
          })}
        />
        {MensajeDeErrorInput("ObservacionesInfraccion")}
      </span>
      <span className="GrupoDeInputs Completo">
        <p>
          <ion-icon name="alert-circle"></ion-icon> Motivo
        </p>
        <input
          id="MotivoInfraccion"
          type="text"
          name="MotivoInfraccion"
          placeholder="Escribe aquí..."
          {...register("MotivoInfraccion", {
            maxLength: {
              value: 1000,
              message: MENSAJES_VALIDACIONES.MAX1000,
            },
          })}
        />
        {MensajeDeErrorInput("MotivoInfraccion")}
      </span>
      <GrupoDeBotonesInferior BotonSiguiente={true} />
    </form>
  );
}
