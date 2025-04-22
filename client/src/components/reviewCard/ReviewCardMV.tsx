import  { useState } from 'react'
import { ReviewModel } from '../../model/reviewModel';

const ReviewCardMV = (id:number) => {
const [reviews,setReviews]=useState<ReviewModel[]|null>(null);
const limit:number = 3;
    async function fetchLimitedReviews() {
        try {
            const response = await fetch('http://localhost:3000/api/reviews/get-reviews-limit', {
              method: 'POST',
              credentials:"include",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                game_id: Number(id),
               limit
              }),
            });
            
            const data = await response.json();
            console.log("Response Data:", data); 
            if (data.success) {
              console.log("Comment added successfully");
             const  {reviews} =data; 
             setReviews(reviews)
            } else {
              console.log("Failed to add comment:", data.message);
            }
          } catch (error) {
            console.error("Error submitting comment:", error);
          }
        
        
    }

  return (
    {reviews,fetchLimitedReviews}
  )
}

export default ReviewCardMV
