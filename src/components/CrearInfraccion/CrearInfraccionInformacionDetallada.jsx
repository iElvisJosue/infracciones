/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";

// ESTILOS A USAR
import "../../styles/Componentes/CrearInfraccion/CrearInfraccionInformacionDetallada.css";

export default function CrearInfraccionInformacionDetallada({
  informacionDeLaPersona,
  informacionDeLaInfraccion,
  informacionDeLaGrua,
  informacionDelConcepto,
  informacionDocumentosRetenidos,
  informacionDeLasEvidencias,
  idDeLaInfraccion,
  ReiniciarValoresParaNuevaInfraccion,
}) {
  const TotalParaPagar = () => {
    let Total = 0;
    Total = informacionDelConcepto.reduce(
      (acumulador, item) => acumulador + item.ImporteConcepto,
      0
    );
    return Total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="CrearInfraccionInformacionDetallada">
      <GrupoDeBotonesSuperior
        BotonRepetir={true}
        FuncionRegresar={ReiniciarValoresParaNuevaInfraccion}
        VistaRegresar={0}
      />
      <section className="CrearInfraccionInformacionDetallada__Seccion">
        <img src="imagenes/LogoInfraccion.png" alt="Logo Infracción" />
        <h1>Detalles de la infracción</h1>
      </section>
      <div className="CrearInfraccionInformacionDetallada__Detalles Naranja">
        <ion-icon name="document-text"></ion-icon> <b>ID Infracción</b>
        {idDeLaInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles">
        <ion-icon name="car"></ion-icon> <b>Placas</b>
        {informacionDeLaInfraccion.PlacasInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles">
        <ion-icon name="location"></ion-icon> <b>Estado Origen</b>
        {informacionDeLaInfraccion.EstadoOrigenInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles">
        <ion-icon name="location"></ion-icon> <b>Estado</b>
        {informacionDeLaInfraccion.EstadoInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles Dos">
        <ion-icon name="locate"></ion-icon> <b>Municipio</b>
        {informacionDeLaInfraccion.MunicipioInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles Dos">
        <ion-icon name="pin"></ion-icon> <b>Lugar</b>
        {informacionDeLaInfraccion.LugarInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles">
        <ion-icon name="information-circle"></ion-icon> <b>¿Por Hechos?</b>
        {informacionDeLaInfraccion.PorHechosInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles">
        <ion-icon name="apps"></ion-icon> <b>Clasificador</b>
        {informacionDeLaInfraccion.ClasificadorInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles">
        <ion-icon name="speedometer"></ion-icon> <b>¿Maneja Operativo?</b>
        {informacionDeLaInfraccion.ManejaOperativoInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles Azul">
        <ion-icon name="time"></ion-icon> <b>Estatus</b>
        {informacionDeLaInfraccion.EstatusSolicitudInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles Completo">
        <ion-icon name="search"></ion-icon> <b>Observaciones</b>
        {informacionDeLaInfraccion.ObservacionesInfraccion || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles Completo">
        <ion-icon name="alert-circle"></ion-icon> <b>Motivo</b>
        {informacionDeLaInfraccion.MotivoInfraccion || "-"}
      </div>
      <section className="CrearInfraccionInformacionDetallada__Seccion">
        <img src="imagenes/LogoPersona.png" alt="Logo Persona" />
        <h1>Detalles de la persona</h1>
      </section>
      <div className="CrearInfraccionInformacionDetallada__Detalles Nombre Naranja">
        <ion-icon name="person-circle"></ion-icon> <b>Nombre</b>
        {informacionDeLaPersona.NombrePersona || ""}{" "}
        {informacionDeLaPersona.ApellidoPaternoPersona || ""}{" "}
        {informacionDeLaPersona.ApellidoMaternoPersona || ""}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles">
        <ion-icon name="accessibility"></ion-icon> <b>Tipo</b>
        {informacionDeLaPersona.TipoPersona || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles">
        <ion-icon name="male-female"></ion-icon> <b>Genero</b>
        {informacionDeLaPersona.GeneroPersona || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles Azul">
        <ion-icon name="id-card"></ion-icon> <b>RFC</b>
        {informacionDeLaPersona.RFCPersona.toUpperCase() || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles Azul">
        <ion-icon name="id-card"></ion-icon> <b>CURP</b>
        {informacionDeLaPersona.CURPPersona.toUpperCase() || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles Tres">
        <ion-icon name="location"></ion-icon> <b>Dirección</b>
        {informacionDeLaPersona.DireccionPersona || "-"}
      </div>
      <section className="CrearInfraccionInformacionDetallada__Seccion">
        <img src="imagenes/LogoGrua.png" alt="Logo Grúa" />
        <h1>Detalles de la grúa</h1>
      </section>
      <div className="CrearInfraccionInformacionDetallada__Detalles Dos">
        <ion-icon name="document-text"></ion-icon> <b>Clave</b>
        {informacionDeLaGrua.idGrua || "-"}
      </div>
      <div className="CrearInfraccionInformacionDetallada__Detalles Dos">
        <ion-icon name="build"></ion-icon> <b>Grúa</b>
        {informacionDeLaGrua.NombreGrua || "-"}
      </div>
      <section className="CrearInfraccionInformacionDetallada__Seccion">
        <img src="imagenes/LogoConcepto.png" alt="Logo Conceptos" />
        <h1>Conceptos</h1>
      </section>
      {informacionDelConcepto.map(
        ({ NombreConcepto, ImporteConcepto }, index) => (
          <>
            <div
              className="CrearInfraccionInformacionDetallada__Detalles Dos"
              key={index}
            >
              <ion-icon name="help-circle"></ion-icon> <b>Concepto</b>
              {NombreConcepto || "-"}
            </div>
            <div className="CrearInfraccionInformacionDetallada__Detalles Dos">
              <ion-icon name="cash"></ion-icon> <b>Importe</b>
              {ImporteConcepto.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }) || "-"}
            </div>
          </>
        )
      )}
      <div className="CrearInfraccionInformacionDetallada__Detalles Completo Verde">
        <ion-icon name="cash"></ion-icon> <b>Total</b>
        {TotalParaPagar()}
      </div>
      <section className="CrearInfraccionInformacionDetallada__Seccion">
        <img src="imagenes/LogoDocumentos.png" alt="Logo Documentos" />
        <h1>Documentos Retenidos</h1>
      </section>
      {informacionDocumentosRetenidos.map(
        (
          { NombreDocumento, FolioDocumento, ObservacionesDocumento },
          index
        ) => (
          <>
            <div
              className="CrearInfraccionInformacionDetallada__Detalles Dos"
              key={index}
            >
              <ion-icon name="folder"></ion-icon> <b>Documento</b>
              {NombreDocumento || "-"}
            </div>
            <div className="CrearInfraccionInformacionDetallada__Detalles">
              <ion-icon name="document-text"></ion-icon> <b>Folio</b>
              {FolioDocumento || "-"}
            </div>
            <div className="CrearInfraccionInformacionDetallada__Detalles">
              <ion-icon name="search"></ion-icon> <b>Observaciones</b>
              {ObservacionesDocumento || "-"}
            </div>
          </>
        )
      )}
      <section className="CrearInfraccionInformacionDetallada__Seccion">
        <img src="imagenes/LogoEvidencias.png" alt="Logo Evidencias" />
        <h1>Evidencias</h1>
      </section>
      {informacionDeLasEvidencias.map((imagen, index) => (
        <div
          className="CrearInfraccionInformacionDetallada__Detalles"
          key={index}
        >
          <ion-icon name="image"></ion-icon> <b>Imagen</b>
          <img
            src={URL.createObjectURL(informacionDeLasEvidencias[index])}
            alt="Imagen Evidencia"
            style={{ width: "100px" }}
          />
        </div>
      ))}
    </div>
  );
}
