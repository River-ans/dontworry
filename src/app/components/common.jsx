import styles from "@/app/styles/common.module.scss";

export const Spinner = () => {
  return <span className={styles.loader}></span>;
};

export const Msg = ({ children }) => {
  return <div className={styles.Msg}>{children}</div>;
};
