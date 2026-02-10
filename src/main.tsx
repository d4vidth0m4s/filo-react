import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
//import { AuthProvider } from './contexts/AuthContext';
//import { DataProvider } from './contexts/DataContext';
import './index.css';
import { CartProvider } from "./context/cartContext";

// Crear la instancia del cliente de queries
//const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
   <CartProvider>
  
            <App />
   </CartProvider>
  
  
   
    </BrowserRouter>
  </StrictMode>
);
