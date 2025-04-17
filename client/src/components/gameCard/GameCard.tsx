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
          src="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/504230/capsule_616x353.jpg"
          alt={game.game_description}
          className={styles.image}
        />
        <h3>{game.game_name}</h3>
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
