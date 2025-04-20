import React, { useState } from "react";
import { Comment } from "../../model/commentModel";

const PostWindowVM = (postId: number) => {
  const [postComments, setPostComments] = useState<Comment[]|null>(null);
  const [replyTo,setReplyTo]=useState<number|null>(null)

  async function addComment(e:React.FormEvent){
    e.preventDefault(); 
  
    const formData = new FormData(e.target as HTMLFormElement);
    const commentText = formData.get("text") as string;
    try {
      const response = await fetch('http://localhost:3000/api/comments/add-comment', {
        method: 'POST',
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment_description: commentText,
          post_id:postId,
          comment_responding_to:replyTo
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log("Comment added successfully");
      } else {
        console.log("Failed to add comment:", data.message);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  
  }

  async function fetchPostWithComments() {
    const response = await fetch(
      `http://localhost:3000/api/comments/get-comments/${postId}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    const { comments } = data;
    setPostComments(comments);
    console.log(response);
  }
  return { fetchPostWithComments, postComments,addComment,setReplyTo };
};

export default PostWindowVM;
