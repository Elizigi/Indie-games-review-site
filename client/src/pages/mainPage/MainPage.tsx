// src/pages/games/MainPage.tsx
import styles from "./MainPage.module.scss";
import { useMainPageVM } from "./MainPageVM";
import GameCard from "../../components/gameCard/GameCard";

const MainPage = () => {
  const { games, loading, userRole } = useMainPageVM();

  const handleLogout = () => {
    fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      window.location.href = "/login"; 
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={handleLogout}>Logout</button>
        {userRole === "developer" || userRole === "admin" ? (
          <button onClick={() => (window.location.href = "/add-game")}>
            + Add Game
          </button>
        ) : null}
      </div>

      <div className={styles.carousel}>
        {games.map((game) => (
          <div key={game.game_id} className={styles.carouselItem}>
            <img src={game.game_main_img_url} alt={game.game_name} />
            <p>{game.game_name}</p>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {games.map((game) => (
          <GameCard key={game.game_id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
