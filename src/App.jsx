// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorGlobal } from "./context/GlobalContext";
import { ProveedorInfracciones } from "./context/InfraccionesContext";
import { ProveedorAgentes } from "./context/AgentesContext";
import { ProveedorPersonas } from "./context/PersonasContext";
import { ProveedorGruas } from "./context/GruasContext";
import { ProveedorConceptos } from "./context/ConceptosContext";
import { ProveedorDocumentos } from "./context/DocumentosContext";

// IMPORTAMOS LAS VISTAS
import IniciarSesion from "./views/IniciarSesion";
import Menu from "./views/Menu";
import CrearInfraccion from "./views/CrearInfraccion";
import AdministrarInfracciones from "./views/AdministrarInfracciones";
import AdministrarAgentes from "./views/AdministrarAgentes";
import AdministrarGruas from "./views/AdministrarGruas";
import AdministrarPersonas from "./views/AdministrarPersonas";
import AdministrarDocumentos from "./views/AdministrarDocumentos";
import AdministrarConceptos from "./views/AdministrarConceptos";
import MisInfracciones from "./views/MisInfracciones";

// PROTECCIÓN DE RUTAS
import ProteccionPorCookies from "./protection/ProteccionPorCookies";
import ProteccionParaAdministradores from "./protection/ProteccionParaAdministradores";
import ProteccionParaAgentes from "./protection/ProteccionParaAgentes";

export default function App() {
  return (
    <ProveedorGlobal>
      <ProveedorInfracciones>
        <ProveedorAgentes>
          <ProveedorPersonas>
            <ProveedorGruas>
              <ProveedorConceptos>
                <ProveedorDocumentos>
                  <BrowserRouter>
                    <Routes>
                      {/* RUTAS SIN PROTECCIÓN */}
                      <Route path="/" element={<IniciarSesion />} />
                      {/* TERMINAN LAS RUTAS SIN PROTECCIÓN */}
                      {/* RUTAS PROTEGIDAS PARA USUARIOS LOGUEADOS */}
                      <Route element={<ProteccionPorCookies />}>
                        <Route path="/Menu" element={<Menu />} />
                        <Route
                          path="/Crear-Infraccion"
                          element={<CrearInfraccion />}
                        />
                        {/* RUTAS PROTEGIDAS PARA AGENTES */}
                        <Route element={<ProteccionParaAgentes />}>
                          <Route
                            path="/Mis-Infracciones"
                            element={<MisInfracciones />}
                          />
                        </Route>
                        {/* TERMINAN LAS RUTAS PROTEGIDAS PARA AGENTES */}
                        {/* RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                        <Route element={<ProteccionParaAdministradores />}>
                          <Route
                            path="/Administrar-Infracciones"
                            element={<AdministrarInfracciones />}
                          />
                          <Route
                            path="/Administrar-Agentes"
                            element={<AdministrarAgentes />}
                          />
                          <Route
                            path="/Administrar-Gruas"
                            element={<AdministrarGruas />}
                          />
                          <Route
                            path="/Administrar-Personas"
                            element={<AdministrarPersonas />}
                          />
                          <Route
                            path="/Administrar-Documentos"
                            element={<AdministrarDocumentos />}
                          />
                          <Route
                            path="/Administrar-Conceptos"
                            element={<AdministrarConceptos />}
                          />
                        </Route>
                        {/* TERMINAN LAS RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                      </Route>
                      {/* TERMINAN LAS RUTAS PROTEGIDAS PARA USUARIOS LOGUEADOS */}
                    </Routes>
                  </BrowserRouter>
                </ProveedorDocumentos>
              </ProveedorConceptos>
            </ProveedorGruas>
          </ProveedorPersonas>
        </ProveedorAgentes>
      </ProveedorInfracciones>
    </ProveedorGlobal>
  );
}
