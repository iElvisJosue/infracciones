/* eslint-disable react/prop-types */
// IMPORTAMOS LA IMAGEN
import { IMAGEN_SIN_RESULTADOS } from "../../helpers/Generales/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/Globales/SinResultados.css";

export default function SinResultados({ children }) {
  return (
    <section className="SinResultados">
      <img
        src={IMAGEN_SIN_RESULTADOS}
        alt="No se encontraron resultados"
        className="SinResultados__Imagen"
      />
      <p className="SinResultados__Texto">{children}</p>
    </section>
  );
}
