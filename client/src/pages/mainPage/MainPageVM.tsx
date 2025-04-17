// src/pages/games/MainPageVM.ts
import { useEffect, useState } from "react";

export interface Game {
  game_id: number;
  game_name: string;
  game_description: string;
  game_main_img_url: string;
}


export const useMainPageVM = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<"user" | "developer" | "admin" | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/games", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Полученные игры:", data);
        setGames(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/check-role", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRole(data.role);
      })
      .catch(() => {
        setUserRole("user");
      });
  }, []);

  return { games, loading, userRole };
};
