/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/Globales/InputBusqueda.css";

export default function InputBusqueda({
  establecerFiltro,
  placeholder,
  reiniciarValores,
}) {
  const BuscarPorFiltro = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
      reiniciarValores();
    }
  };

  return (
    <span className="InputBusqueda">
      <input type="text" placeholder={placeholder} onChange={BuscarPorFiltro} />
      <span className="InputBusqueda__Lupa">
        <ion-icon name="search"></ion-icon>
      </span>
    </span>
  );
}
