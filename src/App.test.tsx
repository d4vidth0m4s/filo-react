import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/cartContext';

describe('App', () => {
  it('renders without crashing', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <GoogleOAuthProvider clientId="test">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <CartProvider>
              <App />
            </CartProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    );
    expect(container).toBeTruthy();
  });
});
