/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/CrearInfraccion/CrearInfraccionModalSubiendo.css";

export default function CrearInfraccionModalSubiendo() {
  return (
    <div className="CrearInfraccionModalSubiendo">
      <article className="CrearInfraccionModalSubiendo__Contenido">
        <section className="CrearInfraccionModalSubiendo__Contenido--Subiendo">
          <div className="CrearInfraccionModalSubiendo__Contenido--Subiendo--Barra"></div>
          <small className="CrearInfraccionModalSubiendo__Contenido--Subiendo--Texto">
            👩‍💻
            <br />
            ¡Subiendo información!
            <br />
            ❌
            <br />
            <b>Por favor no cierres esta ventana.</b>
          </small>
        </section>
      </article>
    </div>
  );
}
