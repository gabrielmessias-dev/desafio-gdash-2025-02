import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Imports das páginas
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import PokemonPage from "./pages/PokemonPage";
import UsersPage from "./pages/UsersPage";

const Router = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const path = window.location.pathname;

  if (!isAuthenticated) return <LoginPage />;
  if (path === "/users") return <UsersPage />;
  if (path === "/pokemon") return <PokemonPage />;

  return <DashboardPage />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
