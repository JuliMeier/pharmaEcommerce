import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import ThemeContextProvider from "./context/theme/ThemeContextProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
