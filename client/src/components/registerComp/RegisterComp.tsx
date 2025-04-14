import  { FC } from "react";
import RegisterCompVM from "./RegisterCompVM";

interface RegisterProps {
  setIsLogin: (isLogin: boolean) => void;
}
const RegisterComp: FC<RegisterProps> = ({ setIsLogin }) => {
  const {checkForm} = RegisterCompVM()
  return (
    <>
      <h2>Register</h2>
      <form onSubmit={checkForm}>
      <input type="text" name="username" placeholder="Username" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />

      <label>
        <input type="checkbox" name="isDeveloper" />
        I am a developer
      </label>
      <label>
        <input type="checkbox" name="isAdmin" />
        I am an admin
      </label>

      <button type="submit">Register</button>
      </form>

      <button onClick={() => setIsLogin(true)}>To Login</button>
    </>
  );
};

export default RegisterComp;
