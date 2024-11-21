// IMPORTAMOS LAS AYUDAS A USAR
import { HOST } from "../Generales/Urls";

export const OPCIONES_DEL_MENU = {
  Administrador: [
    {
      ImagenDeLaOpcion: "imagenes/CrearInfraccion.png",
      AltImagenDeLaOpcion: "Icono menú crear infracción",
      NombreDeLaOpcion: "Crear Infracción",
      VinculoOpcion: `${HOST}Crear-Infraccion`,
    },
    {
      ImagenDeLaOpcion: "imagenes/AdministrarInfracciones.png",
      AltImagenDeLaOpcion: "Icono menú administrar infracciones",
      NombreDeLaOpcion: "Administrar Infracciones",
      VinculoOpcion: `${HOST}Administrar-Infracciones`,
    },
    {
      ImagenDeLaOpcion: "imagenes/Agente.png",
      AltImagenDeLaOpcion: "Icono menú agente",
      NombreDeLaOpcion: "Administrar Agentes",
      VinculoOpcion: `${HOST}Administrar-Agentes`,
    },
    {
      ImagenDeLaOpcion: "imagenes/Gruas.png",
      AltImagenDeLaOpcion: "Icono menú gruas",
      NombreDeLaOpcion: "Administrar Grúas",
      VinculoOpcion: `${HOST}Administrar-Gruas`,
    },
    {
      ImagenDeLaOpcion: "imagenes/AdministrarPersonas.png",
      AltImagenDeLaOpcion: "Icono menú personas",
      NombreDeLaOpcion: "Administrar Personas",
      VinculoOpcion: `${HOST}Administrar-Personas`,
    },
  ],
  Agente: [
    {
      ImagenDeLaOpcion: "imagenes/MisInfracciones.png",
      AltImagenDeLaOpcion: "Icono menú mis infracciones",
      NombreDeLaOpcion: "Mis Infracciones",
      VinculoOpcion: `${HOST}Mis-Infracciones`,
    },
    {
      ImagenDeLaOpcion: "imagenes/CrearInfraccion.png",
      AltImagenDeLaOpcion: "Icono menú crear infracción",
      NombreDeLaOpcion: "Crear Infracción",
      VinculoOpcion: `${HOST}Crear-Infraccion`,
    },
  ],
};
