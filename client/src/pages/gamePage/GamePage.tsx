import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import styles from "./GamePage.module.scss";
import AddPostWindow from "../../components/AddPostWindow/AddPostWindow";
import PostWindow from "../../components/postWindow/PostWindow";
import PostCard from "../../components/postCard/PostCard";
import Auth from "../../components/auth/Auth";
import GamePageVM from "./GamePageVM";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import ReviewWindow from "../../components/reviewWindow/ReviewWindow";

const GamePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { userRole } = Auth();
  const {
    setSelectedPost,
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
      game
  } = GamePageVM(Number(id));
  useEffect(() => {
  
    fetchPosts();
  }, []);
  useEffect(() => {
    fetchGames();
  
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!game) return <div className={styles.error}>Game not found.</div>;

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${game.game_main_img_url})` }}
    >
      <div className={styles.gameHeader}>
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${game.game_main_img_url})` }}
        />
        <div className={styles.foreground}>
          <button className={styles.arrow} onClick={() => navigate("/")}>
            ←
          </button>

          <h1>{game.game_name}</h1>
          <p>{game.game_description}</p>
          <div>
            {!userRole.user && <h3>login to rate</h3>}

         <h3>{rating()}</h3>
        {userRole.user&& <button onClick={()=>setReviewPopUp(true)}> add review</button>}
        {reviewPopUp&& <ReviewWindow setCloseWindow={setReviewPopUp} game={game}/>}
          </div>
          <ReviewCard id={Number(id)} ></ReviewCard>

          <div className={styles.posts}>
            <h2 className={styles.postHeader}>Posts</h2>
            {userRole.user ? (
              <button
                className={styles.addPostButton}
                onClick={() => setPostPopUp(true)}
              >
                + Add Post
              </button>
            ) : (
              <>
                {" "}
                <p>login to post: </p>
                <button onClick={() => navigate("/login")}>Login</button>
              </>
            )}
            <div className={styles.postList}>
              {!posts ? (
                <p>No posts yet.</p>
              ) : (
                <div className={styles.postsContainer}>
                  {posts.map((post) => (
                    <PostCard
                      key={post.post_id}
                      post={post}
                      onClick={() => setSelectedPost(post)}
                    />
                  ))}

                  {selectedPost && (
                    <PostWindow
                      setSelectedPost={setSelectedPost}
                      post={selectedPost}
                    ></PostWindow>
                  )}
                </div>
              )}
              {postPopUp && (
                <AddPostWindow
                  gameId={game?.game_id}
                  onClose={() => setPostPopUp(false)}
                  fetchPosts={() => fetchPosts()}
                />
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
