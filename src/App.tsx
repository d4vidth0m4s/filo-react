// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Public Layout/Layout";
import AuthLayout from "./layouts/Public Layout/AuthLayout";
import Home from "./pages/Home";
import Register from "./pages/users/Register";
import UserLog from "./pages/users/UserLog";
import UserPerfil from "./pages/users/UserPerfil";
import PrivateLayout from "./layouts/Private Layout/PrivateLayout";
import TiendasPerfil from "./pages/Tiendas/TiendasPerfil";

const App = () => {
  return (

    <Routes>
      {/* Layout principal con Header y Footer */}
      <Route element={<Layout />}>
        <Route path="/Filo-Home" element={<Home />} />
        <Route path="/tiendas/:slug" element={<TiendasPerfil />} />
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
