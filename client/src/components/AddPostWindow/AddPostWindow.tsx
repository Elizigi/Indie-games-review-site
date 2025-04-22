import { FC } from "react";
import styles from "./AddPostWindow.module.scss";
import { useAddPostVM } from "./AddPostWindowVM";

interface Props {
  gameId: number;
  onClose: (close: boolean) => void;
  fetchPosts: () => void;
}

const AddPostWindow: FC<Props> = ({ gameId, onClose,fetchPosts }) => {
  const { formData, handleChange,handleImgChange,handleTitleChange, handleSubmit, message, loading } =
    useAddPostVM(gameId, onClose,fetchPosts);

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Write a title..."
            required
          />
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Write your post..."
            required
          />
           <input
            name="text"
            value={formData.imgUrl}
            onChange={handleImgChange}
            placeholder=" img url (optional)"
          />
          <div className={styles.buttons}>
            <button type="submit" disabled={loading} >
              {loading ? "Sending..." : "Send"}
            </button>
            <button type="button" onClick={() => onClose(false)}>
              Cancel
            </button>
          </div>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default AddPostWindow;
