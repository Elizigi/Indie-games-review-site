import { useNavigate } from "react-router";
import styles from "./GameCard.module.scss";

export interface Game {
  game_id: number;
  game_name: string;
  game_description: string;
  game_main_img_url: string;
}

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const navigate = useNavigate();

  const goToGamePage = () => {
    navigate(`/game/${game.game_id}`);
  };

  return (
    <div className={styles.card} onClick={goToGamePage}>
      <img
        src={game.game_main_img_url}
        alt={game.game_description}
        className={styles.image}
      />
      <h3>{game.game_name}</h3>
      <p>{game.game_description}</p>
    </div>
  );
};

export default GameCard;
