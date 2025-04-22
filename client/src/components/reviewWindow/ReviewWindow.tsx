import React, { FC, useState } from "react";
import styles from "./ReviewWindow.module.scss";
import { Game } from "../../model/gameModel";

interface ReviewWindowProps {
  game: Game;
  setCloseWindow:(close:boolean)=>void;
}
const ReviewWindow: FC<ReviewWindowProps> = ({ game,setCloseWindow }) => {
  const [isHover, setIsHover] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [error, setError] = useState("");

  async function rateGame(description: string) {
    if (!game) return;
    const response = await fetch("http://localhost:3000/api/games/rate-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        game_id: game?.game_id,
        review_description: description,
        review_rating: selectedRating,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (!data.success) setError(`failed to rate : ${data?.message}`);

    return data;
  }
  async function submitRating(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRating) {
      setError("no selected rating");
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const description = formData.get("description") as string;
    rateGame(description);
  }

  return (
    <>
    <div className={styles.overlay} onClick={()=>setCloseWindow(false)}>   </div>
      <div className={styles.ratingWrapper}>
        <p>{error}</p>
        <div className={styles.starRating}>
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={styles.starContainer}
          >
            {!isHover &&
              [1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={
                    star <= selectedRating
                      ? styles.starFilled
                      : styles.starEmpty
                  }
                >
                  ★
                </button>
              ))}
            {isHover &&
              [1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setSelectedRating(star)}
                  className={
                    star <=
                    (hoveredRating ||
                      Math.round(
                        game?.game_rating_combined / game?.game_rating_users
                      ))
                      ? styles.starFilled
                      : styles.starEmpty
                  }
                >
                  ★
                </button>
              ))}
          </div>
        </div>
        <form onSubmit={submitRating}>
          <textarea name="description" id="description"></textarea>
          <input type="submit" placeholder="submit" className={styles.submitBtn}  />
        </form>
        <button className={styles.cancelBtn} onClick={()=>setCloseWindow(false)}>cancel</button>
      </div>
      </>
  );
};

export default ReviewWindow;
