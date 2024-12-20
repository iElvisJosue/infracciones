/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/Globales/TituloSeccion.css";

export default function TituloSeccion({
  children,
  mostrarBoton = false,
  mostrarContenido = true,
  establecerMostrarContenido,
  emoji = "✍",
}) {
  const claseTituloSeccion = mostrarContenido
    ? "TituloSeccion"
    : "TituloSeccion Ocultar";

  const IconoOcultarMostrar = mostrarContenido ? "eye-off" : "eye";
  const TituloBoton = mostrarContenido
    ? "Ocultar contenido"
    : "Mostrar contenido";

  return (
    <h1 className={claseTituloSeccion}>
      {children} <br />{" "}
      {mostrarBoton ? (
        <ion-icon
          name={IconoOcultarMostrar}
          onClick={() => establecerMostrarContenido(!mostrarContenido)}
          title={TituloBoton}
        ></ion-icon>
      ) : (
        emoji
      )}
    </h1>
  );
}
