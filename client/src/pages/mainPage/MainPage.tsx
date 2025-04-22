import styles from "./MainPage.module.scss";
import { useMainPageVM } from "./MainPageVM";
import GameCard from "../../components/gameCard/GameCard";
import TopNavBar from "../../components/topNabBar/TopNavBar";
import CarouselGames from "../../components/carouselGames/CarouselGames";

const MainPage = () => {
  const { games, loading } = useMainPageVM();

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <TopNavBar />

      <CarouselGames games={games} />

      <div className={styles.grid}>
        {games.map((game) => (
          <GameCard key={game.game_id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
