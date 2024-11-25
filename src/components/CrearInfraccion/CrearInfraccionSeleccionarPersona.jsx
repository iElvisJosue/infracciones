/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";
import InputBusqueda from "../Globales/InputBusqueda";
import TextoResultados from "../Globales/TextoResultados";
import ControlDePaginacion from "../Globales/ControlDePaginacion";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPersonasActivasPorFiltro from "../../hooks/CrearInfraccion/useObtenerPersonasActivasPorFiltro";
import usePaginacion from "../../hooks/Paginacion/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../styles/Componentes/CrearInfraccion/CrearInfraccionSeleccionarPersona.css";

export default function CrearInfraccionSeleccionarPersona({
  establecerInformacionDeLaPersona,
  establecerVistaCrearInfraccion,
}) {
  const { personas, cargandoPersonas, establecerFiltroPersonas } =
    useObtenerPersonasActivasPorFiltro();
  const {
    CantidadParaMostrar,
    paginaParaMostrar,
    indiceInicial,
    indiceFinal,
    cantidadDePaginas,
    establecerCantidadDePaginas,
    MostrarVeinticincoMas,
    MostrarVeinticincoMenos,
    reiniciarValores,
  } = usePaginacion();
  useEffect(() => {
    if (personas) {
      const CantidadDePaginasEnPersona = Math.ceil(
        personas.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(CantidadDePaginasEnPersona);
    }
  }, [personas]);
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
      <InputBusqueda
        establecerFiltro={establecerFiltroPersonas}
        placeholder="Nombre, CURP ó RFC"
        reiniciarValores={reiniciarValores}
      />
      {personas.length > CantidadParaMostrar && (
        <ControlDePaginacion
          resultadosComponente={personas}
          paginaParaMostrar={paginaParaMostrar}
          cantidadDePaginas={cantidadDePaginas}
          CantidadParaMostrar={CantidadParaMostrar}
          MostrarVeinticincoMas={MostrarVeinticincoMas}
          MostrarVeinticincoMenos={MostrarVeinticincoMenos}
          indiceInicial={indiceInicial}
          indiceFinal={indiceFinal}
        />
      )}
      {personas.length > 0 && <TextoResultados listaContenido={personas} />}
      {personas.length > 0 ? (
        personas.slice(indiceInicial, indiceFinal).map((persona) => (
          <section
            className="CrearInfraccionSeleccionarPersona__Persona"
            key={persona.idPersona}
            onClick={() => {
              EstablecerPersonaYVista(persona);
            }}
          >
            <img src="imagenes/InformacionPersona.png" alt="Imagen persona" />
            <b>Nombre</b>
            <p>
              {persona.NombrePersona} {persona.ApellidoPaternoPersona}{" "}
              {persona.ApellidoMaternoPersona}
            </p>
            {persona.CURPPersona && (
              <>
                {/* <ion-icon name="id-card"></ion-icon> */}
                <b>Curp</b>
                <p>{persona.CURPPersona.toUpperCase()}</p>
                <b>Rfc</b>
                <p>{persona.RFCPersona.toUpperCase()}</p>
              </>
            )}
            {/* {persona.DireccionPersona && (
              <>
                <ion-icon name="location"></ion-icon>
                <p>{persona.DireccionPersona}</p>
              </>
            )} */}
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
