import styles from "./AddGame.module.scss";
import { useAddGameVM } from "./AddGameVM";

const AddGame = () => {
  const { formData, handleChange, handleSubmit, message, loading, isAuthorized } = useAddGameVM();

  if (isAuthorized === false) {
    return <div>Access Denied - You are not authorized to view this page</div>;
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Game</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="game_name"
          placeholder="Game Name"
          required
          onChange={handleChange}
          value={formData.game_name}
        />
        <input
          type="text"
          name="game_developer"
          placeholder="Developer"
          required
          onChange={handleChange}
          value={formData.game_developer}
        />
        <input
          type="date"
          name="game_release_date"
          required
          onChange={handleChange}
          value={formData.game_release_date}
        />
        <input
          type="text"
          name="game_genre"
          placeholder="Genre"
          required
          onChange={handleChange}
          value={formData.game_genre}
        />
        <textarea
          name="game_description"
          placeholder="Description"
          required
          onChange={handleChange}
          value={formData.game_description}
        ></textarea>
        <input
          type="text"
          name="game_main_img_url"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={formData.game_main_img_url}
        />
        <input
          type="number"
          step="0.1"
          name="game_rating_combined"
          placeholder="Combined Rating"
          onChange={handleChange}
          value={formData.game_rating_combined || ""}
        />
        <input
          type="number"
          name="game_rating_users"
          placeholder="User Rating Count"
          onChange={handleChange}
          value={formData.game_rating_users || ""}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Game"}
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default AddGame;
