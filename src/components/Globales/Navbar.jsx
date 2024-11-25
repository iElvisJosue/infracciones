/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../../helpers/Generales/Urls";

// ESTILOS A USAR
import "../../styles/Componentes/Globales/Navbar.css";

export default function Navbar({
  TextoRegresar = "Menú",
  TituloNavbar = "Nombre Aplicación",
}) {
  const { agente } = useGlobal();

  return (
    <nav className="Navbar">
      <a href="Menu" className="Navbar__Boton">
        <ion-icon name="apps"></ion-icon>
        {TextoRegresar}
      </a>
      <h1 className="Navbar__Titulo">{TituloNavbar}</h1>
      <img
        className="Navbar__FotoAgente"
        src={`${HOST_IMG}${agente.FotoAgente}`}
        alt="Foto Agente"
      />
    </nav>
  );
}
