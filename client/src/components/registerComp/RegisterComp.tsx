import { FC } from "react";
import RegisterCompVM from "./RegisterCompVM";
import styles from "../../pages/LoginPage.module.scss";

interface RegisterProps {
  setIsLogin: (isLogin: boolean) => void;
}

const RegisterComp: FC<RegisterProps> = ({ setIsLogin }) => {
  const { checkForm } = RegisterCompVM();

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={checkForm}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />

        <div className={styles["checkbox-container"]}>
          <label className={styles["checkbox-label"]}>
            <input type="checkbox" name="isDeveloper" />
            I am a developer
          </label>
          <label className={styles["checkbox-label"]}>
            <input type="checkbox" name="isAdmin" />
            I am an admin
          </label>
        </div>

        <button type="submit">Register</button>
      </form>

      <button onClick={() => setIsLogin(true)}>To Login</button>
    </>
  );
};

export default RegisterComp;
