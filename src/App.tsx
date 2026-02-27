// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Public Layout/Layout";
import AuthLayout from "./layouts/Public Layout/AuthLayout";
import Home from "./pages/Home";
import Register from "./pages/users/Register";
import UserLog from "./pages/users/UserLog";
import UserPerfil from "./pages/users/UserPerfil";
import PrivateLayout from "./layouts/Private Layout/PrivateLayout";
import TiendasPerfil from "./pages/Tiendas/TiendasPerfil";
import ConfirmacionPedido from "./pages/checkout/ConfirmacionPedido";

import CategoriaTiendas from './pages/CategoriaTiendas';
//import TiendaDetalle from "./pages/Tiendas/tiendaDetalle";


const App = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log("Lat:", lat);
      console.log("Lng:", lng);
    },
    (error) => {
      console.log("Error:", error);
    }
  );

  return (


    <Routes>
      {/* Layout principal con Header y Footer */}
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/Filo-home" replace />} />
        <Route path="/Filo-home" element={<Home />} />
        <Route path="/tiendas/:slug" element={<TiendasPerfil />} />

        <Route path="/confirmar-pedido" element={<ConfirmacionPedido />} />
      {/*  <Route path="/tiendas/:slug" element={<TiendaDetalle />} /> */}  

        <Route path="/categoria/:slug" element={<CategoriaTiendas />} />
        {/*  <Route path="/tiendas/:slug" element={<TiendaDetalle />} /> */}
      </Route>




      {/* Layout de autenticación lgin y registro */}
      <Route element={<AuthLayout />}>
        <Route path="/users/login" element={<UserLog />} />
        <Route path="/users/register" element={<Register />} />
      </Route>

      {/* Layout rutas privadas */}
      <Route element={<PrivateLayout />}>
        <Route path="/users/" element={<UserPerfil />} />
      </Route>


      <Route path="*" element={<div>404 Not Found</div>} />

    </Routes>



  );
};

export default App;
