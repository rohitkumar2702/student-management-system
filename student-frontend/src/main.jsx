import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";

import "./styles/tokens.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 3200,
          style: {
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(12px)",
            color: "#292927",
            border: "1px solid rgba(41, 41, 39, 0.10)",
            borderRadius: "12px",
            boxShadow:
              "0 4px 12px rgba(41, 41, 39, 0.08), 0 16px 40px rgba(41, 41, 39, 0.10)",
            fontSize: "14px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#4E7A5B", secondary: "#F7F3EA" },
          },
          error: {
            iconTheme: { primary: "#572B3A", secondary: "#F7F3EA" },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);