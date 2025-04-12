import { useState } from "react";
import styles from "./LoginPage.module.scss";
import LoginComp from "../components/loginComp/LoginComp";
import RegisterComp from "../components/registerComp/RegisterComp";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={styles.container}>
      {isLogin ? (
        <LoginComp setIsLogin={setIsLogin} />
      ) : (
        <RegisterComp setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default LoginPage;
