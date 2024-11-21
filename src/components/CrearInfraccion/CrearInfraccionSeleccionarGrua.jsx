/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS A USAR
import useObtenerGruasActivarPorFiltro from "../../hooks/CrearInfraccion/useObtenerGruasActivarPorFiltro";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesSuperior from "../Globales/GrupoDeBotonesSuperior";
import Cargando from "../Globales/Cargando";
import SinResultados from "../Globales/SinResultados";

export default function CrearInfraccionSeleccionarGrua({
  establecerInformacionDeLaGrua,
  establecerVistaCrearInfraccion,
}) {
  const { gruas, cargandoGruas, establecerFiltroGruas } =
    useObtenerGruasActivarPorFiltro();

  const ObtenerGruas = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroGruas(valorIntroducido);
      // reiniciarValores();
    }
  };

  const EstablecerGruaYVista = (persona) => {
    establecerInformacionDeLaGrua(persona);
    establecerVistaCrearInfraccion(3);
  };

  if (cargandoGruas) {
    return <Cargando />;
  }

  return (
    <div className="CrearInfraccionSeleccionarGrua">
      <GrupoDeBotonesSuperior
        BotonRegresar={true}
        FuncionRegresar={establecerVistaCrearInfraccion}
        VistaRegresar={1}
      />
      <h1 className="CrearInfraccionSeleccionarGrua--Titulo">
        Paso 3/6 <br />
        Selecciona la grúa <br /> 👥
      </h1>
      <span className="CrearInfraccionSeleccionarGrua__Buscar">
        <input type="text" placeholder="Buscar grúa" onChange={ObtenerGruas} />
        <span className="CrearInfraccionSeleccionarGrua__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      <small className="CrearInfraccionSeleccionarGrua__TextoResultados">
        <ion-icon name="search-circle"></ion-icon>Obtuvimos {gruas.length}{" "}
        resultados{" "}
      </small>
      {gruas.length > 0 ? (
        gruas.map((grua) => (
          <section
            className="CrearInfraccionSeleccionarGrua__Grua"
            key={grua.idGrua}
            onClick={() => {
              EstablecerGruaYVista(grua);
            }}
          >
            <img src="imagenes/InformacionGrua.png" alt="Imagen grua" />
            <p>{grua.NombreGrua}</p>
          </section>
        ))
      ) : (
        <SinResultados>
          ¡Vaya! No se encontraron grúas registradas.
        </SinResultados>
      )}
    </div>
  );
}
