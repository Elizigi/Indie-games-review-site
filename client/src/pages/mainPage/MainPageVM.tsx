// src/pages/games/MainPageVM.ts
import { useEffect, useState } from "react";
import { Game } from "../../model/gameModel";

export const useMainPageVM = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/games/fetch-games", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Recieved games:", data);
        const { games }=data;
        setGames(games);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

 

  return { games, loading };
};
