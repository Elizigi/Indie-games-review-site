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

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!game) return <div className={styles.error}>Game not found.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.gameHeader}>
        <img
          src={game.game_main_img_url}
          alt={game.game_name}
          className={styles.image}
        />
        <div>
          <h1>{game.game_name}</h1>
          <p>{game.game_description}</p>
          <button
            className={styles.addPostButton}
            onClick={() => setPostPopUp(true)}
          >
            + Add Post
          </button>
        </div>
      </div>

      <h2 className={styles.postHeader}>Posts</h2>
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
      </div>
    </div>
  );
};

export default GamePage;
