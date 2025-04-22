import { useNavigate } from "react-router";
import styles from "./GameCard.module.scss";

export interface Game {
  game_id: number;
  game_name: string;
  game_description: string;
  game_main_img_url: string;
  game_rating_combined:number;
  game_rating_users:number;
}

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const navigate = useNavigate();

  const goToGamePage = () => {
    navigate(`/game/${game.game_id}`);
  };
  function rating() {
    const totalStars = 5;
  
    if (!game?.game_rating_users || game?.game_rating_combined === 0) {
      return "☆".repeat(totalStars); 
    }
  
    const avg = Math.round(game.game_rating_combined / game.game_rating_users);
    return  <>
    <span style={{ color: "gold"  }}>
      {"★".repeat(avg)}
    </span>
      {"☆".repeat(totalStars - avg)}
   
  </>; 
  }
  return (
    <div className={styles.card} onClick={goToGamePage}>
      <img
        src={game.game_main_img_url}
        alt={game.game_description}
        className={styles.image}
      />
      <h3>{game.game_name}</h3>
      <h3 className={styles.gameRating}>{rating()}</h3>

    </div>
  );
};

export default GameCard;
