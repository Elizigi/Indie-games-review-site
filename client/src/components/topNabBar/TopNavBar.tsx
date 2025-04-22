import { useNavigate } from "react-router";
import Auth from "../auth/Auth";
import styles from "./TopNavBar.module.scss";

const TopNavBar = () => {
  const { userRole } = Auth();
  const navigate=useNavigate()
  const handleLogout = () => {
    fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
        window.location.reload();
    });
  };
  return (
    <div className={styles.topBar}>
      <div className={styles.logoSpacer}>
        <h1 className={styles.title}>Steamie</h1>
      </div>

      {userRole.user === "developer" || userRole.user === "admin" ? (
        <>
          <button onClick={() => (window.location.href = "/add-game")}>
            + Add game
          </button>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={()=> navigate("/login")}>login</button>
      )}
    </div>
  );
};

export default TopNavBar;
