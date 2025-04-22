import { FC, useEffect } from "react";
import ReviewCardMV from "./ReviewCardMV"


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
   
    <div>
    <h2>Last reviews</h2>
    <ul>
      {reviews?.map((r) => (
        <li key={r.review_id}>
          <strong>{r.user_name}</strong> rated <em>{r.game_name}</em>:
          {` ${r.review_rating}/5`} – {r.review_description}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default ReviewCard
