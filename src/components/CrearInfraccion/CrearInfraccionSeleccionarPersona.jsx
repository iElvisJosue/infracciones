/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPersonasActivasPorFiltro from "../../hooks/CrearInfraccion/useObtenerPersonasActivasPorFiltro";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";

export default function CrearInfraccionSeleccionarPersona({
  establecerInformacionDeLaPersona,
  establecerVistaCrearInfraccion,
}) {
  const { personas, cargandoPersonas, establecerFiltroPersonas } =
    useObtenerPersonasActivasPorFiltro();

  const ObtenerPersonas = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroPersonas(valorIntroducido);
      // reiniciarValores();
    }
  };

  const EstablecerPersonaYVista = (persona) => {
    establecerInformacionDeLaPersona(persona);
    establecerVistaCrearInfraccion(1);
  };

  if (cargandoPersonas) {
    return <Cargando />;
  }

  return (
    <div className="CrearInfraccionSeleccionarPersona">
      <h1 className="CrearInfraccionSeleccionarPersona--Titulo">
        Paso 1/6
        <br />
        Selecciona la persona a infraccionar <br /> 👥
      </h1>
      <span className="CrearInfraccionSeleccionarPersona__Buscar">
        <input
          type="text"
          placeholder="Buscar persona por NOMBRE, CURP o RFC"
          onChange={ObtenerPersonas}
        />
        <span className="CrearInfraccionSeleccionarPersona__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      <small className="CrearInfraccionSeleccionarPersona__TextoResultados">
        <ion-icon name="search-circle"></ion-icon>Obtuvimos {personas.length}{" "}
        resultados{" "}
      </small>
      {personas.length > 0 ? (
        personas.map((persona) => (
          <section
            className="CrearInfraccionSeleccionarPersona__Persona"
            key={persona.idPersona}
            onClick={() => {
              EstablecerPersonaYVista(persona);
            }}
          >
            <img src="imagenes/InformacionPersona.png" alt="Imagen persona" />
            <p>
              {persona.NombrePersona} {persona.ApellidoPaternoPersona}{" "}
              {persona.ApellidoMaternoPersona}
            </p>
            {persona.CURPPersona && (
              <>
                <ion-icon name="id-card"></ion-icon>
                <p>{persona.RFCPersona.toUpperCase()}</p>
                <p>{persona.CURPPersona.toUpperCase()}</p>
              </>
            )}
            {persona.DireccionPersona && (
              <>
                <ion-icon name="location"></ion-icon>
                <p>{persona.DireccionPersona}</p>
              </>
            )}
          </section>
        ))
      ) : (
        <SinResultados>
          ¡Vaya! No se encontraron personas registradas.
        </SinResultados>
      )}
    </div>
  );
}
