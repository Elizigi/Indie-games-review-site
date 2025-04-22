import  { useState } from 'react'
import { Game } from '../../model/gameModel';
import { Post } from '../../model/postModel';

const GamePageVM = (id:number) => {
    const [game, setGame] = useState<Game | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [postPopUp, setPostPopUp] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [reviewPopUp, setReviewPopUp] = useState(false);

    
    
      function rating() {
        const totalStars = 5;
    
        if (!game?.game_rating_users || game?.game_rating_combined === 0) {
          return "☆".repeat(totalStars);
        }
    
        const avg = Math.round(game.game_rating_combined / game.game_rating_users);
        return (
          <>
            <span style={{ color: "gold" }}>{"★".repeat(avg)}</span>
            {"☆".repeat(totalStars - avg)}
          </>
        );
      }
    const fetchGames = async () => {
        try {
          const resGame = await fetch(
            `http://localhost:3000/api/games/fetch-game/${id}`,
            {
              credentials: "include",
            }
          );
          const gameData = await resGame.json();
          if (!resGame.ok)
            throw new Error(gameData.message ?? "Game fetch failed");
          const { game } = gameData;
          setGame(game);
        } catch (err) {
          console.error("Error loading game or posts:", err);
        } finally {
          setLoading(false);
        }
      };
    const fetchPosts = async () => {
        try {
          const resPosts = await fetch(
            `http://localhost:3000/api/posts/fetch-posts-by-game/${id}`,
            {
              credentials: "include",
            }
          );
          const postData = await resPosts.json();
          const { posts } = postData;
  
          console.log(postData);
  
          console.log(posts);
          setPosts(posts.reverse());
        } catch (err) {
          console.error("Error loading game or posts:", err);
        }}

  return (
    {  setSelectedPost,
      setPostPopUp,
      fetchGames,
      fetchPosts,
      setReviewPopUp,
      rating,
      posts,
      loading,
      postPopUp,
      reviewPopUp,
      selectedPost,
      game}
  )
}

export default GamePageVM
