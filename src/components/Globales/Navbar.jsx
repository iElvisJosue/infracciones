/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { LOGO_TRANSITO } from "../../helpers/Generales/Urls";

// ESTILOS A USAR
import "../../styles/Componentes/Globales/Navbar.css";

export default function Navbar({
  TextoRegresar = "Menú",
  TituloNavbar = "Nombre Aplicación",
  LogoNavbar = LOGO_TRANSITO,
}) {
  return (
    <nav className="Navbar">
      <a href="Menu" className="Navbar__Boton">
        <ion-icon name="apps"></ion-icon>
        {TextoRegresar}
      </a>
      <h1 className="Navbar__Titulo">{TituloNavbar}</h1>
      <img className="Navbar__Logo" src={LogoNavbar} alt="Logo Transito" />
    </nav>
  );
}
