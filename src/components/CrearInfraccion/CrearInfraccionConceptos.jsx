/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerConceptosActivos from "../../hooks/CrearInfraccion/useObtenerConceptosActivos";

// IMPORTAMOS LAS AYUDAS
import { CalcularTotalConceptos } from "../../helpers/Generales/Funciones";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/CrearInfraccion/CrearInfraccionConceptos.css";

export default function CrearInfraccionConceptos({
  informacionDelConcepto,
  establecerInformacionDelConcepto,
  establecerVistaCrearInfraccion,
}) {
  const { conceptos } = useObtenerConceptosActivos();
  const { handleSubmit, register, reset } = useForm({
    criteriaMode: "all",
  });
  const ManejarDetallesDelConcepto = handleSubmit(async (data) => {
    if (data.idListaConcepto === "Invalido")
      return toast.warning(
        "¡Oops! Parece que olvidaste seleccionar un concepto.",
        {
          theme: "colored",
        }
      );
    const ConceptoYaAgregado = informacionDelConcepto.some(
      (concepto) => concepto.idListaConcepto === data.idListaConcepto
    );
    if (ConceptoYaAgregado)
      return toast.warning("¡Oops! Ya agregaste este concepto.", {
        theme: "colored",
      });

    const ConceptoEncontrado = conceptos.find(
      (concepto) => concepto.idListaConcepto === Number(data.idListaConcepto)
    );
    data.ImporteConcepto = ConceptoEncontrado.ImporteConcepto;
    data.NombreConcepto = ConceptoEncontrado.NombreConcepto;

    const listaDeConceptos = [...informacionDelConcepto]; // Crear una copia del pedido actual
    const nuevoConcepto = {
      ...data, // Copia del objeto data
    };
    listaDeConceptos.push(nuevoConcepto);
    establecerInformacionDelConcepto(listaDeConceptos);
    toast.success(
      `¡El concepto ${ConceptoEncontrado.NombreConcepto.toUpperCase()} ha sido agregado con éxito a la infracción!`,
      {
        theme: "colored",
      }
    );
    reset();
  });

  const EliminarConceptoDeLaLista = (NombreConcepto, id) => {
    toast.success(
      `¡El concepto ${NombreConcepto.toUpperCase()} ha sido eliminado con éxito de la infracción!`,
      {
        theme: "colored",
      }
    );
    const nuevaListaDeConceptos = informacionDelConcepto.filter(
      (item) => item.idListaConcepto !== id
    );
    establecerInformacionDelConcepto(nuevaListaDeConceptos);
  };

  const TerminarListaConceptos = () => {
    establecerVistaCrearInfraccion(4);
  };

  return (
    <form
      className="CrearInfraccionConceptos"
      onSubmit={ManejarDetallesDelConcepto}
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaCrearInfraccion}
        VistaRegresar={2}
      />
      <h1 className="CrearInfraccionConceptos--Titulo">
        Paso 4/6 <br />
        Conceptos de la infracción <br /> 🤔
      </h1>
      <span className="GrupoDeInputs Completo">
        <p>
          <ion-icon name="help-circle"></ion-icon> Selecciona el concepto de la
          infracción<b>*</b>
        </p>
        <select
          id="idListaConcepto"
          name="idListaConcepto"
          {...register("idListaConcepto")}
        >
          <option value="Invalido">Selecciona un concepto</option>
          {conceptos?.map((concepto) => (
            <option
              key={concepto.idListaConcepto}
              value={concepto.idListaConcepto}
              id={concepto.idListaConcepto}
            >
              {concepto.NombreConcepto.toUpperCase()} |{" "}
              {concepto.ImporteConcepto.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </option>
          ))}
        </select>
      </span>
      <span className="CrearInfraccionConceptos__Botones">
        <button className="CrearInfraccionConceptos__Botones--Boton Agregar">
          <ion-icon name="add-circle"></ion-icon>Agregar
        </button>
      </span>
      {informacionDelConcepto.length > 0 && (
        <>
          <section className="CrearInfraccionConceptos__ListaDeConceptos">
            <h1 className="CrearInfraccionConceptos--Titulo">
              Lista de conceptos <br /> 📄
            </h1>
            <span className="CrearInfraccionConceptos__ListaDeConceptos__Titulo">
              <p className="CrearInfraccionConceptos__ListaDeConceptos__Titulo__Texto">
                Total: {CalcularTotalConceptos(informacionDelConcepto)}
              </p>
            </span>
            <div className="CrearInfraccionConceptos__ListaDeConceptos__Encabezado">
              <p>Nombre del concepto</p>
              <p>Importe</p>
              <p>Opciones</p>
            </div>
            {informacionDelConcepto.map(
              ({ idListaConcepto, NombreConcepto, ImporteConcepto }) => (
                <div
                  className="CrearInfraccionConceptos__ListaDeConceptos__Cuerpo"
                  key={idListaConcepto}
                >
                  <span className="CrearInfraccionConceptos__ListaDeConceptos__Cuerpo__Detalles">
                    <p className="CrearInfraccionConceptos__ListaDeConceptos__Cuerpo__Detalles--Texto Azul">
                      <ion-icon name="document"></ion-icon>{" "}
                      <b>{NombreConcepto.toUpperCase()}</b>
                    </p>
                  </span>
                  <span className="CrearInfraccionConceptos__ListaDeConceptos__Cuerpo__Detalles">
                    <p className="CrearInfraccionConceptos__ListaDeConceptos__Cuerpo__Detalles--Texto Verde">
                      <ion-icon name="cash"></ion-icon>{" "}
                      <b>
                        {ImporteConcepto.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </b>
                    </p>
                  </span>
                  <span className="CrearInfraccionConceptos__ListaDeConceptos__Cuerpo__Detalles">
                    <button
                      className="CrearInfraccionConceptos__ListaDeConceptos__Cuerpo__Detalles__Boton Eliminar"
                      onClick={() =>
                        EliminarConceptoDeLaLista(
                          NombreConcepto,
                          idListaConcepto
                        )
                      }
                      type="button"
                      title="Eliminar concepto"
                    >
                      <ion-icon name="trash-bin"></ion-icon>
                    </button>
                  </span>
                </div>
              )
            )}
          </section>
          <span className="CrearInfraccionConceptos__Botones">
            <button
              className="CrearInfraccionConceptos__Botones--Boton Siguiente"
              type="button"
              onClick={TerminarListaConceptos}
            >
              <ion-icon name="arrow-forward"></ion-icon>Siguiente
            </button>
          </span>
        </>
      )}
    </form>
  );
}
