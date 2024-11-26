/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// IMPORTAMOS LOS CONTEXTOS
import { useAgentes } from "../../context/AgentesContext";

// IMPORTAMOS LOS COMPONENTES
import TituloSeccion from "../../components/Globales/TituloSeccion";
import GrupoDeBotonesSuperior from "../../components/Globales/GrupoDeBotonesSuperior";
import GrupoDeBotonesInferior from "../../components/Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/Generales/ObtenerCookie";
import { MANEJAR_RESPUESTAS_DEL_SERVIDOR } from "../../helpers/Generales/ManejarRespuestasDelServidor";
import { HOST_IMG_AGENTES } from "../../helpers/Generales/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/Perfil/PerfilActualizarImagen.css";

export default function PerfilActualizarImagen({
  agente,
  ObtenerInformacionAgente,
  establecerVistaPerfil,
}) {
  const { ActualizarFotoAgente } = useAgentes();
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState(null);
  const { handleSubmit, setValue } = useForm({
    criteriaMode: "all",
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      toast.warning(
        "Solo puedes subir una imagen, por favor inténtalo de nuevo.",
        {
          theme: "colored",
        }
      );
    } else {
      establecerImagenSeleccionada(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setValue("ClaveInternaAgente", agente.ClaveInternaAgente);
    setValue("NombreAgente", agente.NombreAgente);
    setValue("ApellidosAgente", agente.ApellidosAgente);
  }, []);

  const ValidarImagenDePerfil = handleSubmit(async () => {
    const imagenActual = imagenSeleccionada;
    if (!imagenActual.type.startsWith("image")) {
      return MANEJAR_RESPUESTAS_DEL_SERVIDOR({
        status: 404,
        data: "Uno de los archivos seleccionados no es una imagen.",
      });
    }
    if (imagenActual.size > 10000000) {
      return MANEJAR_RESPUESTAS_DEL_SERVIDOR({
        status: 404,
        data: "Una de las imágenes sobrepasa el tamaño máximo permitido (10MB).",
      });
    }
    GuardarImagenDePerfil();
  });

  const GuardarImagenDePerfil = async () => {
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("idAgente", agente.idAgente);
      formData.append("ImagenActual", agente.FotoAgente);
      formData.append("Imagen", imagenSeleccionada);
      const res = await ActualizarFotoAgente(formData);
      if (res.response) {
        const { status, data } = res.response;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
      } else {
        const { status, data } = res;
        MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
        await ObtenerInformacionAgente({
          CookieConToken: COOKIE_CON_TOKEN,
          idAgente: agente.idAgente,
        });
        SolicitudObtenerInformacionAgente();
      }
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  };

  const SolicitudObtenerInformacionAgente = async () => {
    try {
      await ObtenerInformacionAgente({
        CookieConToken: COOKIE_CON_TOKEN,
        idAgente: agente.idAgente,
      });
      establecerVistaPerfil(0);
    } catch (error) {
      const { status, data } = error.response;
      MANEJAR_RESPUESTAS_DEL_SERVIDOR({ status, data });
    }
  };

  const ImagenDePerfil = imagenSeleccionada
    ? URL.createObjectURL(imagenSeleccionada)
    : HOST_IMG_AGENTES + agente.FotoAgente;

  return (
    <form className="PerfilActualizarImagen" onSubmit={ValidarImagenDePerfil}>
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaPerfil}
        VistaRegresar={0}
      />
      <TituloSeccion emoji="📷">Actualizar Foto De Perfil</TituloSeccion>
      <span className="PerfilActualizarImagen__SeleccionarImagen">
        <div
          {...getRootProps()}
          className="PerfilActualizarImagen__SeleccionarImagen__Label"
        >
          <input {...getInputProps()} accept="image/*" multiple={false} />
          {isDragActive ? (
            <picture className="PerfilActualizarImagen__SeleccionarImagen__Label--Imagen">
              <img src="imagenes/AgregarImagen.png" alt="Agregar Imagen" />
            </picture>
          ) : (
            <picture className="PerfilActualizarImagen__SeleccionarImagen__Label--Imagen">
              <img src={ImagenDePerfil} alt="Foto de Perfil" />
            </picture>
          )}
        </div>
      </span>
      <small className="PerfilActualizarImagen__Texto">
        Por favor, selecciona o arrastra la imagen que utilizaras de perfil.{" "}
        <br /> El tamaño máximo de la imagen es de 10MB.
      </small>
      {imagenSeleccionada && <GrupoDeBotonesInferior BotonActualizar={true} />}
    </form>
  );
}
