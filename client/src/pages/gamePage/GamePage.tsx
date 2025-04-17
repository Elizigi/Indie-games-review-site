import { useParams } from "react-router";
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
}

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postPopUp, setPostPopUp] = useState(false);

  useEffect(() => {
    const fetchGameAndPosts = async () => {
      try {
        const resGame = await fetch(`http://localhost:3000/api/games/fetch-game/${id}`, {
          credentials: "include",
        });
        const gameData = await resGame.json();
        if (!resGame.ok) throw new Error(gameData.message || "Game fetch failed");
        const {game}= gameData;
        setGame(game);

        const resPosts = await fetch(`http://localhost:3000/api/posts/get-posts/${id}`, {
          credentials: "include",
        });
        const postData = await resPosts.json();
        setPosts(postData);
      } catch (err) {
        console.error("Error loading game or posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameAndPosts();
  }, [id]);

  const handleAddPost = () => {
    console.log("Add Post clicked for game ID:", id);
    if(game)
    return
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!game) return <div className={styles.error}>Game not found.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.gameHeader}>
        <img src={game.game_main_img_url} alt={game.game_name} className={styles.image} />
        <div>
          <h1>{game.game_name}</h1>
          <p>{game.game_description}</p>
          <button className={styles.addPostButton} onClick={()=>setPostPopUp(true)}>+ Add Post</button>
        </div>
      </div>

      <h2 className={styles.postHeader}>Posts</h2>
      <div className={styles.postList}>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.post_id} className={styles.post}>
              <img src={post.post_img_url} alt={post.post_title} className={styles.postImage} />
              <div>
                <h3>{post.post_title}</h3>
                <p>{post.post_description}</p>
              </div>
            </div>
          ))
        )}
         {postPopUp &&< AddPostWindow gameId={game?.game_id} onClose={()=>setPostPopUp}/>};
      </div>
    </div>
  );
};

export default GamePage;