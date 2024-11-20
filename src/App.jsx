// IMPORTAMOS LOS COMPONENTES REACT
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ProveedorGlobal } from "./context/GlobalContext";

// IMPORTAMOS LAS VISTAS
// import IniciarSesion from "./vistas/IniciarSesion";

// PROTECCIÓN DE RUTAS
// import ProteccionPorCookies from "./proteccion/ProteccionPorCookies";
// import ProteccionParaAdministradores from "./proteccion/ProteccionParaAdministradores";

export default function App() {
  return (
    <div>
      <h1>Esta es un app de transito</h1>
    </div>
  );
}

// export default function App() {
//   return (
//     <ProveedorGlobal>
//       <Routes>
//         {/* RUTAS SIN PROTECCIÓN */}
//         {/* <Route path="/" element={<IniciarSesion />} /> */}
//         {/* TERMINAN LAS RUTAS SIN PROTECCIÓN */}
//         {/* RUTAS PROTEGIDAS PARA USUARIOS LOGUEADOS */}
//         {/* <Route element={<ProteccionPorCookies />}></Route> */}
//       </Routes>
//     </ProveedorGlobal>
//   );
// }
