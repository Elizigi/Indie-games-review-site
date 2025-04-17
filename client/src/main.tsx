import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage.tsx";
import AddGame from "./pages/games/AddGame.tsx";
import Unauthorized from "./pages/auth/Unauthorized.tsx";
import GamePage from "./pages/gamePage/GamePage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/game/:id" element={<GamePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/add-game" element={<AddGame />}></Route>
        <Route path="/401" element={<Unauthorized />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
