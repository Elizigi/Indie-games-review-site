import { FC, useEffect } from "react";
import ReviewCardMV from "./ReviewCardMV"
import styles from "./ReviewCard.module.scss"

interface ReviewCardProps
{
    id:number
}

const ReviewCard:FC<ReviewCardProps> = ({id}) => {
const {reviews,fetchLimitedReviews} = ReviewCardMV(id);

useEffect(() => {
    const fetchData = async () => {
      await fetchLimitedReviews();
    };
    fetchData();
  }, []);
  return (
   
    <div className={styles.lastReviews}>
      <h2>Last Reviews</h2>
      <ul>
        {reviews?.map((r) => (
          <li key={r.review_id}>
            <strong>{r.user_name}</strong> rated <em>{r.game_name}</em>:
            <span className={styles.rating}> {r.review_rating}/5</span> – <p>{r.review_description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReviewCard
