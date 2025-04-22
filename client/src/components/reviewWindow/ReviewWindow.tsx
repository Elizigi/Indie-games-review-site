import React, { FC, useState } from 'react'
import styles from './ReviewWindow.module.scss'
import { Game } from '../../model/gameModel';

interface ReviewWindowProps{
    game:Game
}
const ReviewWindow:FC<ReviewWindowProps> = ({game}) => {
    const [isHover, setIsHover] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);

    async function rateGame() {
     
        if (!game) return;
        const response = await fetch("http://localhost:3000/api/games/rate-game", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            game_id: game?.game_id,
            review_description: "description",
            review_rating: hoveredRating,
          }),
        });
    
        const data = await response.json();
        console.log(data);
        return data;
      }
    async function submitRating(e:React.FormEvent) {
        e.preventDefault();
    }
    
  return (
    <div className={styles.overlay}>

   <div className={styles.ratingWrapper}>
    <form onSubmit={submitRating}>
    <div className={styles.starRating}>
              <button
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className={styles.starContainer}
              >
                { (
                  [1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => rateGame()}
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
                    </span>
                  ))
                )}
              </button>
            </div>
    </form>
   </div> </div>
  )
}

export default ReviewWindow
