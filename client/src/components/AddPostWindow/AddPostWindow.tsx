import { FC } from "react";
import styles from "./AddPostWindow.module.scss";
import { useAddPostVM } from "./AddPostWindowVM";

interface Props {
  gameId: number;
  onClose: (close:boolean) => void;
}

const AddPostWindow: FC<Props> = ({ gameId, onClose }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    message,
    loading,
  } = useAddPostVM(gameId, onClose);

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Write your post..."
            required
          />
          <div className={styles.buttons}>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
            <button type="button" onClick={()=>onClose(true)}>
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
