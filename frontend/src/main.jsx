// ==================================================
// MAIN ENTRY
// React Router setup for public website + admin panel
// ==================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import Admin from "./Admin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>

        {/* ==========================================
            ADMIN DASHBOARD
            ========================================== */}

        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* ==========================================
            PUBLIC WEBSITE
            ========================================== */}

        <Route
          path="*"
          element={<App />}
        />

      </Routes>

    </BrowserRouter>

  </StrictMode>,
);