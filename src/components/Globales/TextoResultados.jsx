/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/Globales/TextoResultados.css";
export default function TextoResultados({ listaContenido }) {
  return (
    <small className="TextoResultados">
      <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
      {listaContenido.length} resultados{" "}
    </small>
  );
}
