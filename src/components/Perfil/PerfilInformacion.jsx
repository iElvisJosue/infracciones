/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/Generales/Funciones";
import { HOST_IMG_AGENTES } from "../../helpers/Generales/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/Perfil/PerfilInformacion.css";
export default function PerfilInformacion({ agente, establecerVistaPerfil }) {
  return (
    <div className="PerfilInformacion">
      <section className="PerfilInformacion__Seccion">
        <p className="PerfilInformacion__Seccion--Titulo">
          Foto de perfil <br />
          📷
        </p>
        <img
          src={`${HOST_IMG_AGENTES}${agente.FotoAgente}`}
          alt="Imagen de perfil"
        />
        <button
          className="PerfilInformacion__Seccion--ActualizarFoto"
          onClick={() => establecerVistaPerfil(1)}
          title="Cambiar foto de perfil"
        >
          <ion-icon name="image"></ion-icon>
        </button>
      </section>
      <hr className="PerfilInformacion__Divisor" />
      <section className="PerfilInformacion__Seccion">
        <p className="PerfilInformacion__Seccion--Titulo">
          Información personal <br />
          👥
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>Clave interna</b>
          <br />
          {agente.ClaveInternaAgente}
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>Nombre</b>
          <br />
          {agente.NombreAgente} {agente.ApellidosAgente}
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>Fecha de creación</b>
          <br />
          {FormatearFecha(agente.FechaCreacionAgente.slice(0, 10))} a las{" "}
          {agente.HoraCreacionAgente}
        </p>
        <button
          className="PerfilInformacion__BotonActualizar"
          onClick={() => establecerVistaPerfil(2)}
          title="Actualizar información personal"
        >
          <ion-icon name="refresh-circle"></ion-icon>
          Actualizar
        </button>
      </section>
      <hr className="PerfilInformacion__Divisor" />
      <section className="PerfilInformacion__Seccion">
        <p className="PerfilInformacion__Seccion--Titulo">
          Contraseña <br />
          🔐
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          ¡Hola {agente.NombreAgente}!, si deseas cambiar tu contraseña, puedes
          hacerlo dando click en el siguiente botón.
        </p>
        <button
          className="PerfilInformacion__BotonActualizar"
          onClick={() => establecerVistaPerfil(3)}
        >
          <ion-icon name="repeat"></ion-icon>
          Cambiar
        </button>
      </section>
    </div>
  );
}
