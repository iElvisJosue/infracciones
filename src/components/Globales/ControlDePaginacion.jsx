/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/Globales/ControlDePaginacion.css";

export default function ControlDePaginacion({
  resultadosComponente,
  paginaParaMostrar,
  cantidadDePaginas,
  CantidadParaMostrar,
  MostrarVeinticincoMas,
  MostrarVeinticincoMenos,
  indiceInicial,
  indiceFinal,
}) {
  return (
    <div className="ControlDePaginacion">
      <p className="ControlDePaginacion--Texto">
        Página {paginaParaMostrar} de {cantidadDePaginas}
      </p>
      {indiceInicial >= CantidadParaMostrar && (
        <button
          className="ControlDePaginacion--Boton Anterior"
          onClick={MostrarVeinticincoMenos}
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      )}
      {indiceFinal < resultadosComponente.length && (
        <button
          className="ControlDePaginacion--Boton Siguiente"
          onClick={MostrarVeinticincoMas}
        >
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      )}
    </div>
  );
}
