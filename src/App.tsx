// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Register from "./pages/users/Register";
import UserLog from "./pages/users/UserLog";
import UserPerfil from "./pages/users/UserPerfil";


const App = () => {
  return (

    <Routes>
      {/* Layout principal con Header y Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Layout de autenticación sin Header ni Footer */}
      <Route element={<AuthLayout />}>
        <Route path="/users/:id" element={<UserPerfil />} />
        <Route path="/users/login" element={<UserLog />} />
        <Route path="/users/register" element={<Register />} />
      </Route>
    </Routes>

  );
};

export default App;
