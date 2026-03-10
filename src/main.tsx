import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
//import { AuthProvider } from './contexts/AuthContext';
//import { DataProvider } from './contexts/DataContext';
import './index.css';
import { CartProvider } from "./context/cartContext";

// Crear la instancia del cliente de queries
//const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() ?? '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
    
  </StrictMode>
  
);
