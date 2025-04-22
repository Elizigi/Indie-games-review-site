import { FC, useEffect } from "react";
import styles from "./PostWindow.module.scss";
import { Post } from "../../model/postModel";
import PostWindowVM from "./PostWindowVM";
import Auth from "../auth/Auth";
import { useNavigate } from "react-router";

interface PostWindowProps {
  setSelectedPost: (post: Post | null) => void;
  post: Post;
}

const PostWindow: FC<PostWindowProps> = ({ post, setSelectedPost }) => {
  const { fetchPostWithComments, postComments, addComment,setReplyTo } = PostWindowVM(
    post.post_id
  );
  const navigate=useNavigate();
  const {userRole} =Auth()
  
  useEffect(() => {
    if(!postComments)
    fetchPostWithComments();
    console.log(postComments);
  }, [fetchPostWithComments, postComments]);

  return (
    <div className={styles.popupBackdrop} onClick={() => setSelectedPost(null)}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setSelectedPost(null)}>Close</button>
        <h2>{post.post_title}</h2>
        <p>{post.post_description}</p>
        {post.post_img_url && <img src={post.post_img_url} alt="" />}
        <hr />
        {userRole.user?<form onSubmit={addComment}>
          <p>add comment:</p>
          <textarea name="text" id="text"></textarea>
          <input type="submit" value="submit" />
        </form>:<> <p>login to comment: </p><button onClick={()=>navigate("/login")}>Login</button></>}
        <hr />
        <h3>comments: </h3>
        {!postComments ? (
          <h3>no comments yet</h3>
        ) : (
          postComments.map((comment) => (
            <div key={comment.comment_id}>
              <p>{comment.user_name}</p>
              <h3>{comment.comment_description}</h3>
              {userRole.user&&<button onClick={()=>setReplyTo(comment.comment_id)}>↩</button>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostWindow;
