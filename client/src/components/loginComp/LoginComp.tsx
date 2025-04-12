import { FC } from "react";
import LoginCompVM from "./LoginCompVM";

interface LoginProps {
  setIsLogin: (isLogin: boolean) => void;
}
const LoginComp: FC<LoginProps> = ({ setIsLogin }) => {
  const {checkForm} = LoginCompVM();
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={checkForm}>
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />

        <button type="submit">Login</button>
      </form>
      <button onClick={() => setIsLogin(false)}>Create Account</button>
    </>
  );
};

export default LoginComp;
