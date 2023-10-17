import React, { Suspense, lazy } from "react";
import { TurnosWrapper } from "./context/TurnosContext";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Calendar } from "./pages/Calendar";
import { Form } from "./pages/Form";
import { Login } from "./pages/Login";
import { AuthWrapper } from "./context/AuthContext";
import { Protected } from "./context/Protected";
import { NotFound } from "./components/NotFound";
import "./index.css";

const Clientas = lazy(() => import("./pages/Clientas"));

export default function App() {
  const routes = [
    { path: "/", element: <Calendar />, protected: true },
    { path: "/form", element: <Form />, protected: true },
    { path: "/clientas", element: <Clientas />, protected: true },
    { path: "/:id", element: <Form />, protected: true },
    { path: "/login", element: <Login />, protected: false },
    { path: "*", element: <NotFound />, protected: false }
  ];

  return (
    <div className="App">
      <AuthWrapper>
        <TurnosWrapper>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.protected ? (
                      <Protected>{route.element}</Protected>
                    ) : (
                      route.element
                    )
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </TurnosWrapper>
      </AuthWrapper>
    </div>
  );
}
