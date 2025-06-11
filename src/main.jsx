import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import ServiceProvider from "./context/ServiceContext.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <ServiceProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ServiceProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
