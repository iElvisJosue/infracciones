/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInfracciones } from "../../context/InfraccionesContext";
import { useGlobal } from "../../context/GlobalContext";

// COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import GrupoDeBotonesInferior from "../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";

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
  const { RegistrarInfraccion, GuardarImagenDeEvidencia } = useInfracciones();
  const [cantidadDeImagenes, establecerCantidadDeImagenes] = useState(0);
  const { handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const onDrop = useCallback((acceptedFiles) => {
    establecerInformacionDeLasEvidencias(acceptedFiles);
    establecerCantidadDeImagenes(acceptedFiles.length);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const ValidarLasImagenes = handleSubmit(async () => {
    let indexDeLaImagen = 0;
    let imagenesValidas = true;
    while (indexDeLaImagen < cantidadDeImagenes) {
      const imagenActual = informacionDeLasEvidencias[indexDeLaImagen];
      if (!imagenActual.type.startsWith("image")) {
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({
          status: 404,
          data: "Uno de los archivos seleccionados no es una imagen.",
        });
        imagenesValidas = false;
        return;
      }
      if (imagenActual.size > 10000000) {
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({
          status: 404,
          data: "Una de las imágenes sobrepasa el tamaño máximo permitido (10MB).",
        });
        imagenesValidas = false;
        return;
      }
      indexDeLaImagen++;
    }
    if (imagenesValidas) {
      GuardarInformacionDeLaInfraccion();
    }
  });

  const GuardarInformacionDeLaInfraccion = async () => {
    try {
      const res = await RegistrarInfraccion({
        CookieConToken: COOKIE_CON_TOKEN,
        Infraccion: informacionDeLaInfraccion,
        idAgente: agente.idAgente,
        idPersona: informacionDeLaPersona.idPersona,
        idGrua: informacionDeLaGrua.idGrua,
        Concepto: informacionDelConcepto,
        DocumentosRetenidos: informacionDocumentosRetenidos,
      });
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        GuardarLasImagenes(res.data.idInfraccion);
      }
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  };

  const GuardarLasImagenes = async (idInfraccion) => {
    let numImagen = 0;
    while (numImagen < cantidadDeImagenes) {
      const ImagenPorGuardar = informacionDeLasEvidencias[numImagen];
      ImagenPorGuardar.idInfraccion = idInfraccion;

      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("TituloImagen", "ImagenEvidencia");
      formData.append("idInfraccion", idInfraccion);
      formData.append("Imagen", ImagenPorGuardar);
      try {
        const res = await GuardarImagenDeEvidencia(formData);
        if (res.response) {
          const { status, data } = res.response;
          MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        }
      } catch (error) {
        const { status, data } = error.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      }
      numImagen++;
    }
    establecerIdDeLaInfraccion(idInfraccion);
    establecerVistaCrearInfraccion(6);
  };

  return (
    <form
      className="CrearInfraccionEvidencias"
      encType="multipart/form-data"
      onSubmit={ValidarLasImagenes}
    >
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
        Por favor, selecciona o arrastra las imágenes que utilizaras para tus
        evidencias. <br /> El tamaño máximo de las imágenes es de 10MB.
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
