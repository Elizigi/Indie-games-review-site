import styles from "./Unauthorized.module.scss";

const Unauthorized = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>401 - Unauthorized</h1>
    </div>
  );
};

export default Unauthorized;
