// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/layoutCom/Header";
import NavFooter from "../components/layoutCom/NavFooter";
import "./layout.css";
import Footer from "../components/Footer/Footer";
const Layout = () => {
  return (
    <div className="layout-container">
      <Header />

      <main className="home-main">
        <Outlet />
        <Footer />
      </main>


      <NavFooter />
      
    </div>


  );
};

export default Layout;
