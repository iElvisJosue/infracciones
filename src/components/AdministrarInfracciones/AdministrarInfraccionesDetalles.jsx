/* eslint-disable react/prop-types */

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerConceptosDocumentosEvidencias from "../../hooks/AdministrarInfracciones/useObtenerConceptosDocumentosEvidencias";

// COMPONENTES A USAR
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/Generales/Funciones";
import { HOST_IMG } from "../../helpers/Generales/Urls";

export default function AdministrarInfraccionesDetalles({
  esCompleta,
  detallesInfraccion,
  establecerVistaAdministrarInfracciones,
}) {
  const {
    conceptosDocumentosEvidencias,
    cargandoConceptosDocumentosEvidencias,
  } = useObtenerConceptosDocumentosEvidencias({
    idInfraccion: detallesInfraccion.idInfraccion,
  });

  const TotalParaPagar = () => {
    const { Conceptos } = conceptosDocumentosEvidencias;
    let Total = 0;
    Total = Conceptos.reduce(
      (acumulador, item) => acumulador + item.ImporteConcepto,
      0
    );
    return Total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  if (cargandoConceptosDocumentosEvidencias) return <Cargando />;

  const { Conceptos, DocumentosRetenidos, Evidencias } =
    conceptosDocumentosEvidencias;
  console.log(Conceptos);
  console.log(DocumentosRetenidos);
  console.log(Evidencias);

  return (
    <div
      className="AdministrarInfraccionesDetalles"
      id="AdministrarInfraccionesDetalles"
    >
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaAdministrarInfracciones}
        VistaRegresar={esCompleta ? 0 : 1}
      />
      <section className="AdministrarInfraccionesDetalles__Seccion">
        <img src="imagenes/LogoCreacion.png" alt="Logo Creacion" />
        <h1>Detalles de la creación</h1>
      </section>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="glasses"></ion-icon> <b>Agente</b>
        {detallesInfraccion.NombreAgente || "-"}{" "}
        {detallesInfraccion.ApellidosAgente || ""}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Azul">
        <ion-icon name="key"></ion-icon> <b>Clave Interna</b>
        {detallesInfraccion.ClaveInternaAgente || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="calendar"></ion-icon> <b>Fecha</b>
        {FormatearFecha(
          detallesInfraccion.FechaCreacionInfraccion.slice(0, 10)
        ) || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="time"></ion-icon> <b>Hora</b>
        {detallesInfraccion.HoraCreacionInfraccion || "-"}
      </div>
      <section className="AdministrarInfraccionesDetalles__Seccion">
        <img src="imagenes/LogoInfraccion.png" alt="Logo Infracción" />
        <h1>Detalles de la infracción</h1>
      </section>
      <div className="AdministrarInfraccionesDetalles__Detalles Naranja">
        <ion-icon name="document-text"></ion-icon> <b>ID Infracción</b>
        {detallesInfraccion.idInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="car"></ion-icon> <b>Placas</b>
        {detallesInfraccion.PlacasInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="location"></ion-icon> <b>Estado Origen</b>
        {detallesInfraccion.EstadoOrigenInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="location"></ion-icon> <b>Estado</b>
        {detallesInfraccion.EstadoInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Dos">
        <ion-icon name="locate"></ion-icon> <b>Municipio</b>
        {detallesInfraccion.MunicipioInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Dos">
        <ion-icon name="pin"></ion-icon> <b>Lugar</b>
        {detallesInfraccion.LugarInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="information-circle"></ion-icon> <b>¿Por Hechos?</b>
        {detallesInfraccion.PorHechosInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="apps"></ion-icon> <b>Clasificador</b>
        {detallesInfraccion.ClasificadorInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="speedometer"></ion-icon> <b>¿Maneja Operativo?</b>
        {detallesInfraccion.ManejaOperativoInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Azul">
        <ion-icon name="time"></ion-icon> <b>Estatus</b>
        {detallesInfraccion.EstatusSolicitudInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Completo">
        <ion-icon name="search"></ion-icon> <b>Observaciones</b>
        {detallesInfraccion.ObservacionesInfraccion || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Completo">
        <ion-icon name="alert-circle"></ion-icon> <b>Motivo</b>
        {detallesInfraccion.MotivoInfraccion || "-"}
      </div>
      <section className="AdministrarInfraccionesDetalles__Seccion">
        <img src="imagenes/LogoPersona.png" alt="Logo Persona" />
        <h1>Detalles de la persona</h1>
      </section>
      <div className="AdministrarInfraccionesDetalles__Detalles Nombre Naranja">
        <ion-icon name="person-circle"></ion-icon> <b>Nombre</b>
        {detallesInfraccion.NombrePersona || ""}{" "}
        {detallesInfraccion.ApellidoPaternoPersona || ""}{" "}
        {detallesInfraccion.ApellidoMaternoPersona || ""}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="accessibility"></ion-icon> <b>Tipo</b>
        {detallesInfraccion.TipoPersona || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles">
        <ion-icon name="male-female"></ion-icon> <b>Genero</b>
        {detallesInfraccion.GeneroPersona || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Azul">
        <ion-icon name="id-card"></ion-icon> <b>RFC</b>
        {detallesInfraccion.RFCPersona.toUpperCase() || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Azul">
        <ion-icon name="id-card"></ion-icon> <b>CURP</b>
        {detallesInfraccion.CURPPersona.toUpperCase() || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Tres">
        <ion-icon name="location"></ion-icon> <b>Dirección</b>
        {detallesInfraccion.DireccionPersona || "-"}
      </div>
      <section className="AdministrarInfraccionesDetalles__Seccion">
        <img src="imagenes/LogoGrua.png" alt="Logo Grúa" />
        <h1>Detalles de la grúa</h1>
      </section>
      <div className="AdministrarInfraccionesDetalles__Detalles Dos">
        <ion-icon name="document-text"></ion-icon> <b>Clave</b>
        {detallesInfraccion.idGrua || "-"}
      </div>
      <div className="AdministrarInfraccionesDetalles__Detalles Dos">
        <ion-icon name="build"></ion-icon> <b>Grúa</b>
        {detallesInfraccion.NombreGrua || "-"}
      </div>
      <section className="AdministrarInfraccionesDetalles__Seccion">
        <img src="imagenes/LogoConcepto.png" alt="Logo Conceptos" />
        <h1>Conceptos</h1>
      </section>
      {Conceptos.length > 0 &&
        Conceptos.map(({ NombreConcepto, ImporteConcepto }) => (
          <>
            <div
              className="AdministrarInfraccionesDetalles__Detalles Dos"
              key={NombreConcepto}
            >
              <ion-icon name="help-circle"></ion-icon> <b>Concepto</b>
              {NombreConcepto || "-"}
            </div>
            <div className="AdministrarInfraccionesDetalles__Detalles Dos">
              <ion-icon name="cash"></ion-icon> <b>Importe</b>
              {ImporteConcepto.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }) || "-"}
            </div>
          </>
        ))}
      {Conceptos.length > 0 && (
        <div className="AdministrarInfraccionesDetalles__Detalles Completo Verde">
          <ion-icon name="cash"></ion-icon> <b>Total</b>
          {TotalParaPagar()}
        </div>
      )}
      {Conceptos.length === 0 && (
        <SinResultados>¡Oops! No se encontraron conceptos.</SinResultados>
      )}
      <section className="AdministrarInfraccionesDetalles__Seccion">
        <img src="imagenes/LogoDocumentos.png" alt="Logo Documentos" />
        <h1>Documentos Retenidos</h1>
      </section>
      {DocumentosRetenidos.length > 0 ? (
        DocumentosRetenidos.map(
          (
            { NombreDocumento, FolioDocumento, ObservacionesDocumento },
            index
          ) => (
            <>
              <div
                className="AdministrarInfraccionesDetalles__Detalles Dos"
                key={index}
              >
                <ion-icon name="folder"></ion-icon> <b>Documento</b>
                {NombreDocumento || "-"}
              </div>
              <div className="AdministrarInfraccionesDetalles__Detalles">
                <ion-icon name="document-text"></ion-icon> <b>Folio</b>
                {FolioDocumento || "-"}
              </div>
              <div className="AdministrarInfraccionesDetalles__Detalles">
                <ion-icon name="search"></ion-icon> <b>Observaciones</b>
                {ObservacionesDocumento || "-"}
              </div>
            </>
          )
        )
      ) : (
        <SinResultados>
          ¡Oops! No se encontraron documentos retenidos.
        </SinResultados>
      )}
      <section className="AdministrarInfraccionesDetalles__Seccion">
        <img src="imagenes/LogoEvidencias.png" alt="Logo Evidencias" />
        <h1>Evidencias</h1>
      </section>
      {Evidencias.length > 0 ? (
        Evidencias.map((imagen, index) => (
          <div
            className="AdministrarInfraccionesDetalles__Detalles"
            key={index}
          >
            <ion-icon name="image"></ion-icon> <b>Imagen #{index + 1} </b>
            <img
              src={`${HOST_IMG}${Evidencias[index].NombreEvidencia}`}
              alt="Imagen Evidencia"
              style={{ width: "100px" }}
            />
          </div>
        ))
      ) : (
        <SinResultados>¡Oops! No se encontraron evidencias.</SinResultados>
      )}
    </div>
  );
}
