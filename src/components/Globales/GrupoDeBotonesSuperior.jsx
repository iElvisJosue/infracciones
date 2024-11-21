/* eslint-disable react/prop-types */
// LOS ESTILOS ESTAN EN GENERALES > GENERALES.CSS
export default function GrupoDeBotonesSuperior({
  BotonRegresar = false,
  BotonRepetir = false,
  FuncionRegresar,
  VistaRegresar,
}) {
  return (
    <span className="GrupoDeBotonesSuperior">
      {BotonRegresar && (
        <button
          type="button"
          onClick={() => FuncionRegresar(VistaRegresar)}
          className="GrupoDeBotonesSuperior--Boton Regresar"
        >
          <ion-icon name="arrow-back"></ion-icon>Regresar
        </button>
      )}
      {BotonRepetir && (
        <button
          type="button"
          onClick={() => FuncionRegresar(VistaRegresar)}
          className="GrupoDeBotonesSuperior--Boton Regresar"
        >
          <ion-icon name="repeat"></ion-icon>Otra Infracción
        </button>
      )}
    </span>
  );
}
