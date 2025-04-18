import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./GamePage.module.scss";
import AddPostWindow from "../../components/AddPostWindow/AddPostWindow";

interface Post {
  post_id: number;
  post_title: string;
  post_description: string;
  post_img_url: string;

}

interface Game {
  game_id: number;
  game_name: string;
  game_description: string;
  game_main_img_url: string;
  game_rating_combined:number;
  game_rating_users:number;
}

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postPopUp, setPostPopUp] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const navigate = useNavigate()
  const [isHover,setIsHover]= useState(false);
  useEffect(() => {
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
        setPosts(posts);
      } catch (err) {
        console.error("Error loading game or posts:", err);
      }
    };
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

    fetchGames();
    fetchPosts();
  }, [id]);
  async function rateGame() {
    if(!game) return;
    const response = await fetch("http://localhost:3000/api/games/rate-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", 
      body: JSON.stringify({
        game_id: game?.game_id,
        review_description: "description",
        review_rating: hoveredRating
      })
    });
  
    const data = await response.json();
    console.log(data)
    return data;
  }

  function rating() {
    const totalStars = 5;
  
    if (!game?.game_rating_users || game?.game_rating_combined === 0) {
      return "☆".repeat(totalStars); 
    }
  
    const avg = Math.round(game.game_rating_combined / game.game_rating_users);
    return  <>
    <span style={{ color: "gold"  }}>
      {"★".repeat(avg)}
    </span>
      {"☆".repeat(totalStars - avg)}
   
  </>; 
  }

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!game) return <div className={styles.error}>Game not found.</div>;

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${game.game_main_img_url})` }}>
  <div className={styles.gameHeader}>
  <div
    className={styles.backgroundImage}
    style={{ backgroundImage: `url(${game.game_main_img_url})` }}
  />
  <div className={styles.foreground}>
  <button className={styles.arrow} onClick={()=>navigate("/")}>←</button>

    <h1>{game.game_name}</h1>
    <p>{game.game_description}</p>
    <div>
    <div className={styles.starRating}>
      <button       onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
       className={styles.starContainer}>
      {!isHover?<h3 className={styles.stars}>{rating()}</h3>:
      [1, 2, 3, 4, 5].map((star) => (
    <span 
      key={star}
      onMouseEnter={() => setHoveredRating(star)}
      onMouseLeave={() => setHoveredRating(0)}
      onClick={()=>rateGame()}
      className={
        star <= (hoveredRating || Math.round(game?.game_rating_combined / game?.game_rating_users))
          ? styles.starFilled
          : styles.starEmpty
      }
    >
      ★
    </span>
  ))}
      
      
 </button>
</div>
    </div>
    <div className={styles.posts}>
    <h2 className={styles.postHeader}>Posts</h2>
    <button
      className={styles.addPostButton}
      onClick={() => setPostPopUp(true)}
    >
      + Add Post
    </button>
      <div className={styles.postList}>
        {!posts ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.post_id} className={styles.post}>
              {post.post_img_url !== "aaa" && (
                <img
                  src={post.post_img_url}
                  alt={post.post_title}
                  className={styles.postImage}
                />
              )}
              <div>
                <h3>{post.post_title}</h3>
                <p>{post.post_description}</p>
              </div>
            </div>
          ))
        )}
        {postPopUp && (
          <AddPostWindow
            gameId={game?.game_id}
            onClose={() => setPostPopUp(false)}
            
          />
        )}{" "}
      </div></div>
  </div>
  
</div>

    
    </div>
  );
};

export default GamePage;
