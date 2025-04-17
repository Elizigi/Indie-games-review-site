import { useState } from "react";
import styles from "./GameCard.module.scss";
import AddPostWindow from "../AddPostWindow/AddPostWindow"; 

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
  const [showPostWindow, setShowPostWindow] = useState(false);

  const handleAddPostClick = () => {
    setShowPostWindow(true);
  };

  return (
    <>
      <div className={styles.card}>
        <img
          src={game.game_main_img_url}
          alt={game.game_description}
          className={styles.image}
        />
        <h3>{game.game_name}</h3>
        <p>{game.game_description}</p>

        <button onClick={handleAddPostClick}>+ Add Post</button>
      </div>

      {showPostWindow && (
        <AddPostWindow
          gameId={game.game_id}
          onClose={() => setShowPostWindow(false)}
        />
      )}
    </>
  );
};

export default GameCard;
