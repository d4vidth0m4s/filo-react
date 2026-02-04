// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/layoutCom/Header";
import NavFooter from "../components/layoutCom/NavFooter";
import "./layout.css";
const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      
      <main className="home-main">
        <Outlet />
      </main>


       <NavFooter /> 
</div>


  );
};

export default Layout;
