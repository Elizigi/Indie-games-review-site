import { FC } from "react";
import LoginCompVM from "./LoginCompVM";
import styles from "../../pages/LoginPage.module.scss";

interface LoginProps {
  setIsLogin: (isLogin: boolean) => void;
}

const LoginComp: FC<LoginProps> = ({ setIsLogin }) => {
  const { checkForm } = LoginCompVM();

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={checkForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className={styles.switch_button} onClick={() => setIsLogin(false)}>
        Create Account
      </div>
    </>
  );
};

export default LoginComp;
