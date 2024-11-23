/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/CrearInfraccion/CrearInfraccionModalExitoso.css";

export default function CrearInfraccionModalExitoso({
  establecerVistaCrearInfraccion,
}) {
  return (
    <div className="CrearInfraccionModalExitoso">
      <article className="CrearInfraccionModalExitoso__Contenido">
        <section className="CrearInfraccionModalExitoso__Contenido--Completado">
          <img
            src="imagenes/LogoExitoso.png"
            alt="Imagen de subida completada"
            className="CrearInfraccionModalExitoso__Contenido--Completado--Imagen"
          />
          <p className="CrearInfraccionModalExitoso__Contenido--Completado--Texto">
            🎉
            <br />
            ¡Buenas noticias! La infracción ha sido registrada con éxito.
            <br />
            📄
            <br />
            Para ver los detalles, da click en el botón de abajo.
          </p>
          <button
            className="CrearInfraccionModalExitoso__Contenido--Completado--Boton"
            type="button"
            onClick={() => establecerVistaCrearInfraccion(6)}
          >
            <ion-icon name="eye"></ion-icon>
            Ver Detalles
          </button>
        </section>
      </article>
    </div>
  );
}
