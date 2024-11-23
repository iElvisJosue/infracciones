/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerDocumentosActivos from "../../hooks/CrearInfraccion/useObtenerDocumentosActivos";

// IMPORTAMOS LAS AYUDAS
import { MENSAJES_VALIDACIONES } from "../../helpers/Generales/MensajesValidaciones";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/CrearInfraccion/CrearInfraccionDocumentosRetenidos.css";

export default function CrearInfraccionDocumentosRetenidos({
  informacionDocumentosRetenidos,
  establecerInformacionDocumentosRetenidos,
  establecerVistaCrearInfraccion,
}) {
  const { documentos } = useObtenerDocumentosActivos();
  const { handleSubmit, register, reset } = useForm({
    criteriaMode: "all",
  });
  const ManejarDocumentosRetenidos = handleSubmit(async (data) => {
    // PRIMER VERIFICAMOS SI SE HA SELECCIONADO UN DOCUMENTO
    if (data.NombreDocumento === "Invalido")
      return toast.warning(
        "¡Oops! Parece que olvidaste seleccionar un documento.",
        {
          theme: "colored",
        }
      );
    // SEGUNDO VERIFICAMOS SI YA SE HA AGREGADO EL DOCUMENTO
    const DocumentoYaAgregado = informacionDocumentosRetenidos.some(
      (documento) => documento.NombreDocumento === data.NombreDocumento
    );
    if (DocumentoYaAgregado)
      return toast.warning("¡Oops! Ya agregaste este documento.", {
        theme: "colored",
      });

    const listaDeDocumentos = [...informacionDocumentosRetenidos]; // Crear una copia del pedido actual
    const nuevoDocumento = {
      ...data, // Copia del objeto data
    };
    listaDeDocumentos.push(nuevoDocumento);
    establecerInformacionDocumentosRetenidos(listaDeDocumentos);
    toast.success(
      `¡El documento ${data.NombreDocumento.toUpperCase()} ha sido agregado con éxito a la infracción!`,
      {
        theme: "colored",
      }
    );
    reset();
  });

  const EliminarDocumentoDeLaLista = (NombreDocumento) => {
    toast.success(
      `¡El documento ${NombreDocumento.toUpperCase()} ha sido eliminado con éxito de la infracción!`,
      {
        theme: "colored",
      }
    );
    const nuevaListaDeDocumentos = informacionDocumentosRetenidos.filter(
      (item) => item.NombreDocumento !== NombreDocumento
    );
    establecerInformacionDocumentosRetenidos(nuevaListaDeDocumentos);
  };

  const TerminarListaDeDocumentos = () => {
    establecerVistaCrearInfraccion(5);
  };

  return (
    <form
      className="CrearInfraccionDocumentosRetenidos"
      onSubmit={ManejarDocumentosRetenidos}
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaCrearInfraccion}
        VistaRegresar={3}
      />
      <h1 className="CrearInfraccionDocumentosRetenidos--Titulo">
        Paso 5/6 <br />
        Documentos retenidos <br /> ✋📄
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="help-circle"></ion-icon> Selecciona el documento
          <b>*</b>
        </p>
        <select
          id="NombreDocumento"
          name="NombreDocumento"
          {...register("NombreDocumento")}
        >
          <option value="Invalido">Selecciona un documento</option>
          {documentos?.map((concepto) => (
            <option
              key={concepto.NombreDocumento}
              value={concepto.NombreDocumento}
              id={concepto.NombreDocumento}
            >
              {concepto.NombreDocumento.toUpperCase()}
            </option>
          ))}
        </select>
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="document-text"></ion-icon> Folio
        </p>
        <input
          id="FolioDocumento"
          type="text"
          name="FolioDocumento"
          placeholder="Escribe aquí..."
          {...register("FolioDocumento", {
            maxLength: {
              value: 100,
              message: MENSAJES_VALIDACIONES.MAX100,
            },
          })}
        />
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="search"></ion-icon> Observaciones
        </p>
        <input
          id="ObservacionesDocumento"
          type="text"
          name="ObservacionesDocumento"
          placeholder="Escribe aquí..."
          {...register("ObservacionesDocumento", {
            maxLength: {
              value: 1000,
              message: MENSAJES_VALIDACIONES.MAX1000,
            },
          })}
        />
      </span>
      <span className="CrearInfraccionDocumentosRetenidos__Botones">
        <button className="CrearInfraccionDocumentosRetenidos__Botones--Boton Agregar">
          <ion-icon name="add-circle"></ion-icon>Agregar
        </button>
      </span>
      {informacionDocumentosRetenidos.length > 0 && (
        <>
          <section className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos">
            <h1 className="CrearInfraccionDocumentosRetenidos--Titulo">
              Lista de documentos <br /> 📄
            </h1>
            <div className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Encabezado">
              <p className="Parrafo--Documento"></p>
              <p className="Parrafo--Folio"></p>
              <p className="Parrafo--Observaciones"></p>
              <p className="Parrafo--Opciones"></p>
            </div>
            {informacionDocumentosRetenidos.map(
              ({ NombreDocumento, FolioDocumento, ObservacionesDocumento }) => (
                <div
                  className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Cuerpo"
                  key={NombreDocumento}
                >
                  <span className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Cuerpo__Detalles">
                    <p className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Cuerpo__Detalles--Texto Azul">
                      <ion-icon name="document"></ion-icon>{" "}
                      <b>{NombreDocumento.toUpperCase()}</b>
                    </p>
                  </span>
                  <span className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Cuerpo__Detalles">
                    <p className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Cuerpo__Detalles--Texto">
                      <ion-icon name="document-text"></ion-icon>{" "}
                      <b>{FolioDocumento || "-"}</b>
                    </p>
                  </span>
                  <span className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Cuerpo__Detalles">
                    <p className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Cuerpo__Detalles--Texto">
                      <ion-icon name="search"></ion-icon>{" "}
                      <b>{ObservacionesDocumento || "-"}</b>
                    </p>
                  </span>
                  <span className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Cuerpo__Detalles">
                    <button
                      className="CrearInfraccionDocumentosRetenidos__ListaDeDocumentos__Cuerpo__Detalles__Boton Eliminar"
                      onClick={() =>
                        EliminarDocumentoDeLaLista(NombreDocumento)
                      }
                      type="button"
                      title="Eliminar documento"
                    >
                      <ion-icon name="trash-bin"></ion-icon>
                    </button>
                  </span>
                </div>
              )
            )}
          </section>
          <span className="CrearInfraccionDocumentosRetenidos__Botones">
            <button
              className="CrearInfraccionDocumentosRetenidos__Botones--Boton Siguiente"
              type="button"
              onClick={TerminarListaDeDocumentos}
            >
              <ion-icon name="arrow-forward"></ion-icon>Siguiente
            </button>
          </span>
        </>
      )}
    </form>
  );
}
