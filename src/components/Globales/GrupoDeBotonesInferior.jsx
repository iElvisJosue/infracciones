/* eslint-disable react/prop-types */
// LOS ESTILOS ESTAN EN GENERALES > GENERALES.CSS
export default function GrupoDeBotonesInferior({
  BotonCancelar = false,
  BotonRegistrar = false,
  BotonActualizar = false,
  BotonSiguiente = false,
  BotonFinalizar = false,
}) {
  return (
    <span className="GrupoDeBotonesInferior">
      {BotonCancelar && (
        <button className="GrupoDeBotonesInferior--Boton Cancelar">
          <ion-icon name="close-circle"></ion-icon>Cancelar
        </button>
      )}
      {BotonRegistrar && (
        <button className="GrupoDeBotonesInferior--Boton Registrar">
          <ion-icon name="add-circle"></ion-icon>Registrar
        </button>
      )}
      {BotonActualizar && (
        <button className="GrupoDeBotonesInferior--Boton Actualizar">
          <ion-icon name="reload-circle"></ion-icon>Actualizar
        </button>
      )}
      {BotonSiguiente && (
        <button className="GrupoDeBotonesInferior--Boton Siguiente">
          <ion-icon name="arrow-forward"></ion-icon>Siguiente
        </button>
      )}
      {BotonFinalizar && (
        <button className="GrupoDeBotonesInferior--Boton Registrar">
          <ion-icon name="checkmark-done-circle"></ion-icon>Finalizar
        </button>
      )}
    </span>
  );
}
