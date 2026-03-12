// src/layouts/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../../components/layoutCom/Header';
import NavFooter from '../../components/layoutCom/NavFooter';
import './layout.css';
import CartDrawer from '../../components/cartBuy/carrito-compra';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [abierto, setAbierto] = useState<boolean>(false);
  useEffect(() => {
    document.body.classList.toggle('carrito-abierto', abierto);
  }, [abierto]);
  return (
    <div className="layout-container">
      <Header onCartClick={() => setAbierto(true)} />

      <main className="main">
        <Outlet />
      </main>

      <CartDrawer abierto={abierto} setAbierto={setAbierto} />

      <NavFooter />
    </div>
  );
};

export default Layout;
