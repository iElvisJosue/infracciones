/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInfracciones } from "../../context/InfraccionesContext";
import { useGlobal } from "../../context/GlobalContext";

// COMPONENTES A USAR
import CrearInfraccionModalSubiendo from "./CrearInfraccionModalSubiendo";
import CrearInfraccionModalExitoso from "./CrearInfraccionModalExitoso";
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/CrearInfraccion/CrearInfraccionEvidencias.css";
import { toast } from "react-toastify";

export default function CrearInfraccionEvidencias({
  informacionDeLaPersona,
  informacionDeLaInfraccion,
  informacionDeLaGrua,
  informacionDelConcepto,
  informacionDocumentosRetenidos,
  establecerVistaCrearInfraccion,
  establecerIdDeLaInfraccion,
  informacionDeLasEvidencias,
  establecerInformacionDeLasEvidencias,
}) {
  const { agente } = useGlobal();
  const { RegistrarInfraccion } = useInfracciones();
  const [verModalSubiendo, establecerVerModalSubiendo] = useState(false);
  const [verModalExitoso, establecerVerModalExitoso] = useState(false);
  const { handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 5) {
      toast.warning(
        "El máximo de evidencias es de 5, por favor inténtalo de nuevo.",
        { theme: "colored" }
      );
    } else {
      establecerInformacionDeLasEvidencias(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const ValidarLasImagenes = handleSubmit(async () => {
    let indexDeLaImagen = 0;
    let imagenesValidas = true;
    while (indexDeLaImagen < informacionDeLasEvidencias.length) {
      const imagenActual = informacionDeLasEvidencias[indexDeLaImagen];
      if (!imagenActual.type.startsWith("image")) {
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({
          status: 404,
          data: "¡Oops! Parece que uno de los archivos que seleccionaste no es una imagen. Por favor inténtalo de nuevo.",
        });
        imagenesValidas = false;
        return;
      }
      if (imagenActual.size > 10000000) {
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({
          status: 404,
          data: "¡Oops! Parece que una de las imágenes que seleccionaste sobrepasa el tamaño máximo permitido (10MB). Por favor inténtalo de nuevo.",
        });
        imagenesValidas = false;
        return;
      }
      indexDeLaImagen++;
    }
    if (imagenesValidas) {
      establecerVerModalSubiendo(true);
      GuardarInformacionDeLaInfraccion();
    }
  });

  const GuardarInformacionDeLaInfraccion = async () => {
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGENES
      const formData = new FormData();
      formData.append("CookieConToken", COOKIE_CON_TOKEN);
      formData.append("Infraccion", JSON.stringify(informacionDeLaInfraccion));
      formData.append("idAgente", agente.idAgente);
      formData.append("idPersona", informacionDeLaPersona.idPersona);
      formData.append("idGrua", informacionDeLaGrua.idGrua);
      formData.append("Concepto", JSON.stringify(informacionDelConcepto));
      formData.append(
        "DocumentosRetenidos",
        JSON.stringify(informacionDocumentosRetenidos)
      );
      // AGREGAMOS TODAS LAS IMÁGENES
      for (let index = 0; index < informacionDeLasEvidencias.length; index++) {
        formData.append("Imagen", informacionDeLasEvidencias[index]);
      }
      const res = await RegistrarInfraccion(formData);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        establecerVerModalSubiendo(false);
      } else {
        const { idInfraccion } = res.data;
        establecerVerModalSubiendo(false);
        establecerVerModalExitoso(true);
        establecerIdDeLaInfraccion(idInfraccion);
      }
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  };

  return (
    <form
      className="CrearInfraccionEvidencias"
      encType="multipart/form-data"
      onSubmit={ValidarLasImagenes}
    >
      {verModalSubiendo && <CrearInfraccionModalSubiendo />}
      {verModalExitoso && (
        <CrearInfraccionModalExitoso
          establecerVistaCrearInfraccion={establecerVistaCrearInfraccion}
        />
      )}
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaCrearInfraccion}
        VistaRegresar={4}
      />
      <h1 className="CrearInfraccionEvidencias--Titulo">
        Paso 6/6 <br />
        Evidencias <br /> 📷
      </h1>
      <span className="CrearInfraccionEvidencias__SeleccionarImagenes">
        <div
          {...getRootProps()}
          className="CrearInfraccionEvidencias__SeleccionarImagenes__Label"
        >
          <input {...getInputProps()} accept="image/*" multiple />
          {isDragActive ? (
            <picture className="CrearInfraccionEvidencias__Imagen">
              <img src="imagenes/AgregarImagen.png" alt="Agregar Imagenes" />
            </picture>
          ) : (
            <picture className="CrearInfraccionEvidencias__Imagen">
              <img src="imagenes/ArrastrarImagen.png" alt="Arrastra Imagenes" />
            </picture>
          )}
        </div>
      </span>
      <p className="CrearInfraccionEvidencias__Texto">
        Por favor, selecciona o arrastra de 1 a 5 imágenes que utilizaras para
        tus evidencias. <br /> El tamaño máximo de las imágenes es de 10MB.
      </p>
      {informacionDeLasEvidencias.length > 0 && (
        <section className="CrearInfraccionEvidencias__ListaDeEvidencias">
          <h1 className="CrearInfraccionEvidencias--Titulo">
            Lista de imágenes ({informacionDeLasEvidencias.length})<br /> 📷
          </h1>

          <div className="CrearInfraccionEvidencias__ListaDeEvidencias__Encabezado">
            <p>Imagen</p>
            <p>Tamaño</p>
          </div>
          {informacionDeLasEvidencias.map((file, index) => (
            <div
              className="CrearInfraccionEvidencias__ListaDeEvidencias__Cuerpo"
              key={index}
            >
              <span className="CrearInfraccionEvidencias__ListaDeEvidencias__Cuerpo__Detalles">
                <p className="CrearInfraccionEvidencias__ListaDeEvidencias__Cuerpo__Detalles--Texto Azul">
                  <img
                    key={index}
                    src={URL.createObjectURL(informacionDeLasEvidencias[index])}
                    alt=""
                    style={{ width: "100px" }}
                  />
                </p>
              </span>
              <span className="CrearInfraccionEvidencias__ListaDeEvidencias__Cuerpo__Detalles">
                <p className="CrearInfraccionEvidencias__ListaDeEvidencias__Cuerpo__Detalles--Texto Verde">
                  <ion-icon name="cloud-upload"></ion-icon>
                  <b>{(file.size / (1024 * 1024)).toFixed(2)} MB</b>
                </p>
              </span>
            </div>
          ))}
        </section>
      )}
      {informacionDeLasEvidencias.length > 0 && (
        <GrupoDeBotonesInferior BotonFinalizar={true} />
      )}
    </form>
  );
}
